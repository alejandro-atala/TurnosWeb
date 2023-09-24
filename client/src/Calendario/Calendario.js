import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'; // Importa los estilos CSS de FontAwesome
import EventCard from './Evento';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sessionIndividual, setSessionIndividual] = useState('');
  const [sessionGroup, setSessionGroup] = useState('');



  
  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const getValues = async () => {
      try {
        const response = await axios.get('http://localhost:3000/valores');
        const  sessionIndividual  = response.data[0].sessionIndividual;
        const  sessionGroup  = response.data[0].sessionGroup;

        // Set the fetched values as the initial state for the inputs
        setSessionIndividual(sessionIndividual);
        setSessionGroup(sessionGroup);
      } catch (error) {
        console.error('Error fetching values:', error);
      }
    };

   getValues();
  }, []);



  const handleSelect = async ({ start, end }) => {
    const title = prompt('Ingrese su nombre:');
    if (title) {
      const eventData = {
        title,
        start,
        end,
      };
      try {
        console.log(eventData);
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
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/turnos/${eventId}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error al eliminar turno:', error);
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
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fas fa-trash-alt"
              style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}
              onClick={() => handleDeleteEvent(event.id)}
            ></i>

            <div style={{ marginRight: '30px' }}>{event.nombre}</div>
            <div style={{ marginRight: '30px' }}>{event.telefono}</div>
            <div>{event.paymentType}</div>

          </div>
        ),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  // useEffect(() => {
  //   getValues();
  // }, []);



  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventCard = () => {
    setSelectedEvent(null);
  };

  // const getValues = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/valores');
  //     const { sessionIndividual, sessionGroup } = response.data;

  //     setSessionIndividual(sessionIndividual);
  //     setSessionGroup(sessionGroup);
  //   } catch (error) {
  //     console.error('Error fetching values:', error);
  //   }
  // };


  const handleGuardarClick = async () => {
    const eventData = {
      sessionIndividual,
      sessionGroup,
    };

    try {
      await axios.put('http://localhost:3000/valores', eventData);
      console.log('Valores actualizados');
    } catch (error) {
      console.error('Error al actualizar valores:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sessionIndividual') {
      setSessionIndividual(value);
    } else if (name === 'sessionGroup') {
      setSessionGroup(value);
    }
  };


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
        onSelectEvent={handleEventClick}
        timeslots={1} step={60}
        defaultView={'work_week'}
        min={new Date(0, 0, 0, 8, 0, 0)}  // Hora mínima: 8:00 AM
        max={new Date(0, 0, 0, 18, 0, 0)}  // Hora máxima: 6:00 PM
        views={['day', 'work_week']}
      />

{selectedEvent && (
        <div className="event-card-overlay" onClick={closeEventCard}>
          <EventCard event={selectedEvent} onClose={closeEventCard} />
        </div>
      )}

<input
        type="text"
        placeholder="Sesión individual"
        value={sessionIndividual || ''}  // Use a default value if sessionIndividual is null
        name="sessionIndividual"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Sesión grupal"
        value={sessionGroup || ''}  // Use a default value if sessionGroup is null
        name="sessionGroup"
        onChange={handleInputChange}
      />

      <button onClick={handleGuardarClick}>Guardar</button>


    </div>
  );
};

export default MyCalendar;
