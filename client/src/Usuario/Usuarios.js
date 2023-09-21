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
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null); // Initialize with a default value


  const handleDOMContentLoaded = () => {
    // Call your function here that requires the DOM to be loaded

  };

  useEffect(() => {
    // Listen for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []); // Empty dependency array to run this effect once



  const handleSelect = async ({ start, end }) => {
    const selectedEvent = events.find(event => {
      return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
    });
  
    let formData; // Initialize formData here
    let eventData; // Initialize eventData here
  
  
    if (selectedEvent) {
      const { paymentType } = selectedEvent;
  
      if (paymentType === 'Individual') {
        const isCellOccupied = events.some(event => {
          return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
        });
  
        if (isCellOccupied) {
          alert('Esta franja horaria ya está ocupada. Por favor, elige otro horario.');
          return;
        }
  
        updatePaymentDetails(formData.paymentOption);
        localStorage.setItem('eventData', JSON.stringify(eventData));
  
        try {
          const response = await axios.post('http://localhost:3000/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          setEvents([...events, newEvent]);
        } catch (error) {
          console.error('Error al reservar turno:', error);
        }
      } else if (paymentType === 'Grupal') {
        updatePaymentDetails(formData.paymentOption);
        localStorage.setItem('eventData', JSON.stringify(eventData));
  
        try {
          const response = await axios.post('http://localhost:3000/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          setEvents([...events, newEvent]);
        } catch (error) {
          console.error('Error al reservar turno:', error);
        }
      }
    } else {
      formData = await showReservationForm(); // Initialize formData here
  
      if (!formData) {
        // User canceled the reservation
        return;
      }
  
      const eventId = generateUniqueId(6);
  
      const eventData = {
        eventId,
        ...formData,
        start,
        end,
        paymentType: formData.paymentOption,
      };
  
      // Handle the reservation based on payment type (individual or grupal)
      if (formData.paymentOption === 'Individual') {
        // Handle individual event reservation
        // ...
      } else if (formData.paymentOption === 'Grupal') {
        // Handle grupal event reservation
        // ...
      }
    }
  };







  const showReservationForm = () => {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

      const formContainer = document.createElement('div');
      formContainer.style.position = 'absolute';
      formContainer.style.top = '30%';
      formContainer.style.left = '50%';
      formContainer.style.transform = 'translate(-50%, -50%)';
      formContainer.style.backgroundColor = 'rgba(78, 202, 155,1)';
      formContainer.style.padding = '20px';
      formContainer.style.zIndex = '1000';
      formContainer.style.width = '50%';
      formContainer.style.textAlign = 'center';

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
        <div class="form-group">
          <label for="paymentOption">Seleccione un tipo de sesion</label>
          <select id="paymentOption" name="paymentOption" class="form-control">
            <option value="disable">Seleccione tipo</option>
            <option value="Individual">Sesión individual</option>
            <option value="Grupal">Sesión Grupal</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Confirmar Reserva</button>
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
          paymentOption: form.querySelector('#paymentOption').value,
        };

        // Update the state with the selected payment option
        setSelectedPaymentOption(formData.paymentOption);

        resolve(formData);
        document.body.removeChild(overlay);
        formContainer.remove();
      });

      const cancelButton = formContainer.querySelector('#cancelButton');
      cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        formContainer.remove();
      });

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



  // Update payment details based on the selected option


  // Update payment details based on the selected option
  const updatePaymentDetails = async (selectedOption) => { // Accept selectedOption as an argument


    if (selectedOption) {
      let paymentTitle = 'Reserva de turno - Sesion individual';
      let paymentAmount = 4500;

      if (selectedOption === 'Grupal') {
        paymentTitle = 'Reserva de turno - Sesion grupal';
        paymentAmount = 10000;
      }

      const preferenceData = {
        items: [
          {
            title: paymentTitle,
            unit_price: paymentAmount,
            quantity: 1,
          },
        ],
        back_urls: {
          success: 'http://localhost:3001/usuarios',
          failure: 'http://localhost:3001/usuarios?payment_failure=true',
          pending: 'http://localhost:3001/usuarios?payment_pending=true',
        },
      };

      console.log('Updated Payment Details:', preferenceData);

      try {
        const response = await axios.post('http://localhost:3000/mercadopago/create_preference', preferenceData);
        const preferenceId = response.data.id;

        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;

      } catch (error) {
        console.error('Error al crear la preferencia de MercadoPago:', error);
      }
    } else {
      console.error('No payment option selected.');
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
        title: 'Ocupado',
        paymentType: event.paymentType

      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  const handlePaymentFailure = async () => {
    const eventDataFromLocalStorage = localStorage.getItem('eventData');
    const selectedEvent = eventDataFromLocalStorage ? JSON.parse(eventDataFromLocalStorage) : null;


    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:3000/turnos/borrar/${selectedEvent.eventId}`);
        alert('El turno ha sido eliminado debido a que el pago no se realizó correctamente.');
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
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        views={['day', 'work_week']}
      />
    </div>
  );
};

export default Usuarios;


