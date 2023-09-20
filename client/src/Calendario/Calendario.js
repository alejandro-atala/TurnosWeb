import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'; // Importa los estilos CSS de FontAwesome


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

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
      setEvents(events.filter(event => event.id !== eventId));
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
          <div style={{ display: 'flex',alignItems: 'center' }}>
            <div>{event.title}</div>
            <i
              className="fas fa-trash-alt"
              style={{ cursor: 'pointer', color: 'red', marginLeft: '50px' }}
              onClick={() => handleDeleteEvent(event.id)}
            ></i>
          </div>
        ),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };
  

  useEffect(() => {
    getEvents();
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
        timeslots={1} step={60}
        defaultView={'work_week'}
        min={new Date(0, 0, 0, 8, 0, 0)}  // Hora mínima: 8:00 AM
        max={new Date(0, 0, 0, 18, 0, 0)}  // Hora máxima: 6:00 PM
        views={['day', 'work_week']}
      />
    </div>
  );
};

export default MyCalendar;
