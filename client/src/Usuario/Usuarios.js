import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const localizer = momentLocalizer(moment);

const Usuarios = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = async ({ start, end }) => {
    // Verificamos si la celda está ocupada
    const isCellOccupied = events.some(event => {
      return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
    });
  
    if (isCellOccupied) {
      alert('Esta franja horaria ya está ocupada. Por favor, elige otro horario.');
      return;
    }
  
    // Si no está ocupada, se permite la reserva
    const formData = await showReservationForm(); // Mostrar el formulario y esperar a que el usuario complete los datos
    if (formData) {
      const eventId = generateUniqueId(6);
      const eventData = {
        eventId,
        ...formData,
        start,
        end,
      };
      console.log(eventData);
      localStorage.setItem('eventData', JSON.stringify(eventData));
  
      // Intenta guardar el evento en la base de datos
      try {
        const response = await axios.post('http://localhost:3000/turnos/reservar', eventData);
        const newEvent = {
          ...eventData,
          id: response.data.id,
        };
        setEvents([...events, newEvent]);
  
        // Después de guardar el evento, procede a la página de pago
        redirectToPayment();
      } catch (error) {
        console.error('Error al reservar turno:', error);
      }
    }
  };
  
  const showReservationForm = () => {
    return new Promise((resolve) => {
      // Crear una capa semi-transparente para opacar el fondo
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Opacidad del 50%
  
      // Crear el contenedor del formulario
      const formContainer = document.createElement('div');
      formContainer.style.position = 'absolute';
      formContainer.style.top = '30%';
      formContainer.style.left = '50%';
      formContainer.style.transform = 'translate(-50%, -50%)';
      formContainer.style.backgroundColor = 'rgba(78, 202, 155,1)';
      formContainer.style.padding = '20px';
      formContainer.style.zIndex = '1000'; // Índice Z alto para estar encima del calendario
      formContainer.style.width = '50%';
      formContainer.style.textAlign = 'center'; // Centrar texto
  
  
      formContainer.innerHTML = `
        <h2>Ingrese sus datos</h2>
        <form id="reservationForm">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="tel" class="form-control" id="telefono" placeholder="Ingrese su teléfono" required />
          </div>
          <button type="submit" class="btn btn-primary mt-3">Guardar</button>
          <button type="button" class="btn btn-secondary mt-3" id="cancelButton">Cancelar</button>
        </form>
      `;
  
      const form = formContainer.querySelector('#reservationForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = {
        nombre: form.querySelector('#nombre').value,
        email: form.querySelector('#email').value,
        telefono: form.querySelector('#telefono').value,
      };
      resolve(formData);
      document.body.removeChild(overlay); // Eliminar la capa de opacidad
      formContainer.remove(); // Eliminar el formulario después de enviar
    });

    // Evento al cancelar el formulario
    const cancelButton = formContainer.querySelector('#cancelButton');
    cancelButton.addEventListener('click', () => {
      document.body.removeChild(overlay); // Eliminar la capa de opacidad
      formContainer.remove(); // Cerrar el formulario al hacer clic en "Cancelar"
    });

    // Agregar los elementos al cuerpo del documento
    overlay.appendChild(formContainer);
    document.body.appendChild(overlay);
  });
};
  
  
  
  
  

  const generateUniqueId = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const redirectToPayment = async () => {
    const preferenceData = {
      items: [
        {
          
          title: 'Reserva de turno',
          unit_price: 4500, // Precio en centavos (ejemplo: $1.00)
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'http://localhost:3001/usuarios', // URL de éxito
        failure: 'http://localhost:3001/usuarios?payment_failure=true', // URL de fallo
        pending: 'http://localhost:3001/usuarios?payment_pending=true', // URL pendiente
      },
      // notification_url: 'http://localhost:3001/usuarios'
    };

    try {
      const response = await axios.post('http://localhost:3000/mercadopago/create_preference', preferenceData);
      const preferenceId = response.data.id;

      // Redireccionar al usuario a la página de pago de MercadoPago
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
    } catch (error) {
      console.error('Error al crear la preferencia de MercadoPago:', error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/turnos');
      const formattedEvents = response.data.map(event => ({
        ...event,
        id: event.id,
        start: new Date(event.start),
        end: new Date(event.end),
        title: 'Ocupado', // Cambia el título a "Ocupado"
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  const handlePaymentFailure = async () => {
    const eventDataFromLocalStorage = localStorage.getItem('eventData');
    const selectedEvent = eventDataFromLocalStorage ? JSON.parse(eventDataFromLocalStorage) : null;
  
    console.log(selectedEvent)
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:3000/turnos/borrar/${selectedEvent.eventId}`);
        alert('El turno ha sido eliminado debido a que el pago no se realizó correctamente.');
        
        // After deleting, refresh the events list to reflect the change
        getEvents();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    }
  };
  

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    // Detectar si el pago falló
    const urlParams = new URLSearchParams(window.location.search);
    const paymentFailure = urlParams.get('payment_failure');
    if (paymentFailure) {
      handlePaymentFailure();
    }
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelect}
        timeslots={1}
        step={60}
        defaultView={'work_week'}
        min={new Date(0, 0, 0, 8, 0, 0)} // Hora mínima: 8:00 AM
        max={new Date(0, 0, 0, 18, 0, 0)} // Hora máxima: 6:00 PM
        views={['day', 'work_week']}
      />
    </div>
  );
};

export default Usuarios;
