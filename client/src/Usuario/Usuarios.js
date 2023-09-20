import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

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
      const formData = {};
      const formElement = document.createElement('div');
      formElement.innerHTML = `
        <h2>Ingrese sus datos</h2>
        <form id="reservationForm">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="string" class="form-control" id="email" placeholder="Ingrese su correo electrónico" required>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="number" class="form-control" id="telefono" placeholder="Ingrese su teléfono" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      `;
  
      const form = formElement.querySelector('#reservationForm');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        formData.nombre = form.querySelector('#nombre').value;
        formData.email = form.querySelector('#email').value;
        formData.telefono = form.querySelector('#telefono').value;
        resolve(formData);
  
      });
  
      document.body.appendChild(formElement);
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
        style={{ height: 500 }}
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
