import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'; // Importa los estilos CSS de FontAwesome
import EventCard from './Evento';
import './calendario.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ username }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sessionIndividual, setSessionIndividual] = useState('');
  const [sessionGroup, setSessionGroup] = useState('');





  const initializeDatabase = async () => {
    try {
      console.log('Initializing database')
      const response = await axios.get('http://localhost:3000/valores');
      const valores = response.data;

      // Check if default values are already present
      if (!valores || valores.length === 0) {
        // Insert default values
        await axios.post('http://localhost:3000/valores', {
          id: 1,
          sessionIndividual: '0',
          sessionGroup: '0'
        });
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };



  useEffect(() => {
    initializeDatabase();
    getEvents();
    toast.info(`Buen día ${username}, que tengas un excelente día!`);
  }, [username]);
  

  useEffect(() => {
    const getValues = async () => {
      try {
        const response = await axios.get('http://localhost:3000/valores');
        const sessionIndividual = response.data[0].sessionIndividual;
        const sessionGroup = response.data[0].sessionGroup;

        // Set the fetched values as the initial state for the inputs
        setSessionIndividual(sessionIndividual);
        setSessionGroup(sessionGroup);
      } catch (error) {
        console.error('Error fetching values:', error);
      }
    };

    getValues();
  }, []);





  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/turnos/${eventId}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      toast.success('Turno eliminado exitosamente');
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

  const closeEventCard = () => {
    setSelectedEvent(null);
  };



  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };




  const handleGuardarClick = async () => {
    const eventData = {
      sessionIndividual,
      sessionGroup,
    };

    try {
      await axios.put('http://localhost:3000/valores', eventData);
      console.log('Valores actualizados');
      toast.success('Valores actualizados');


    } catch (error) {
      console.error('Error al actualizar valores:', error);
      toast.error('Error al actualizar valores');
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



  // Call the initialization function when your application starts





  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        // onSelectSlot={handleSelect}
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

      <div className="container">
        <div className="container d-flex flex-column justify-content-center align-items-center ">
          <div className="row">
            <div className="col">
              <h6>Aquí podrá actualizar los valores de las sesiones</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <span>Individual</span>
              <input
                type="text"
                className="form-control"
                placeholder="Sesión individual"
                value={sessionIndividual || ''}
                name="sessionIndividual"
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <span>Grupal</span>
              <input
                type="text"
                className="form-control"
                placeholder="Sesión grupal"
                value={sessionGroup || ''}
                name="sessionGroup"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button className="btn btn-primary m-3" onClick={handleGuardarClick}>
                Guardar
              </button>
            </div>


          </div>

        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />

      </div>
    </div>
  );
};

export default MyCalendar;
