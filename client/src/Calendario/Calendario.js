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
import './calendario.css'


const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Dia Inteiro',
  previous: '< Semana anterior',
  next: 'Proxima semana >',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  work_week: 'Semana',

  showMore: (total) => `+ (${total}) Eventos`,

}

const MyCalendar = ({ username }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sessionIndividual, setSessionIndividual] = useState('');
  const [sessionGroup, setSessionGroup] = useState('');
  const [linkIndividual, setLinkIndividual] = useState('');
  const [linkGrupal, setLinkGrupal] = useState('');
  const [calendarKey, setCalendarKey] = useState(0);


  const showAlert = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'danger') {
      toast.error(message);
    }
  };

  const handleSelect = async ({ start, end }) => {

    const formattedStart = moment(start).locale('es').format('LL LT');  // Formatea la fecha de inicio en español
    const formattedEnd = moment(end).locale('es').format('LL LT');      // Formatea la fecha de fin en español

    const currentDate = moment();

    // Verifica si la fecha seleccionada es anterior a la fecha actual
    if (moment(start).isBefore(currentDate)) {
      showAlert('No se pueden reservar turnos en días anteriores a la fecha actual.', 'danger');
      return;
    }


    const isCellOccupied = events.some(event => {
      return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
    });

    if (isCellOccupied) {

      const selectedEvent = events.find(event => {
        return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
      });


      const paymentType = selectedEvent.paymentType;

      if (paymentType === 'Individual') {


        const isCellOccupied = events.some(event => {
          return moment(start).isBefore(event.end) && moment(end).isAfter(event.start);
        });

        if (isCellOccupied) {
          showAlert('Este horario ya está ocupado. Por favor, elige otro.', 'danger');
          return;
        }
        const formData = await showReservationForm();
        const eventId = generateUniqueId(6);

        const eventData = {
          eventId,
          ...formData,
          formattedStart,
          formattedEnd,
          paymentType: formData.paymentOption,
        };


        try {
          const response = await axios.post('https://nodejs-production-9ea4.up.railway.app/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          toast.success("Turno guardado");
          setEvents(prevEvents => [...prevEvents, newEvent]);



        } catch (error) {
          console.error('Error al reservar turno:', error);
        }
      }
      else if (paymentType === 'Grupal') {

        const formData = await showReservationForm();
        const eventId = generateUniqueId(6);

        const eventData = {
          eventId,
          ...formData,
          start,
          end,
          paymentType: formData.paymentOption,
        };




        try {
          const response = await axios.post('https://nodejs-production-9ea4.up.railway.app/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          toast.success("Turno guardado");
          setEvents(prevEvents => [...prevEvents, newEvent]);

        } catch (error) {
          console.error('Error al reservar turno:', error);
        }
      }
    }
    else {

      const formData = await showReservationForm();
      const eventId = generateUniqueId(6);

      const eventData = {
        eventId,
        ...formData,
        start,
        end,
        paymentType: formData.paymentOption,
      };



      try {
        const response = await axios.post('https://nodejs-production-9ea4.up.railway.app/turnos/reservar', eventData);
        const newEvent = {
          ...eventData,
          id: response.data.id,
        };
        toast.success("Turno guardado");
        setEvents(prevEvents => [...prevEvents, newEvent]);

      } catch (error) {
        console.error('Error al reservar turno:', error);
      }
    }
    getEvents();
  }


  const showReservationForm = () => {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

      const formContainer = document.createElement('div');
      formContainer.style.position = 'absolute';
      formContainer.style.top = '50%';
      formContainer.style.left = '50%';
      formContainer.style.transform = 'translate(-50%, -50%)';
      formContainer.style.backgroundColor = 'rgba(78, 202, 155,1)';
      formContainer.style.padding = '20px';
      formContainer.style.zIndex = '1000';
      formContainer.style.width = 'auto';
      formContainer.style.textAlign = 'center';
      formContainer.style.borderRadius = '10px';

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



  const initializeDatabase = async () => {
    try {
      console.log('Initializing database')
      const response = await axios.get('https://nodejs-production-9ea4.up.railway.app/valores');
      const valores = response.data;

      // Check if default values are already present
      if (!valores || valores.length === 0) {
        // Insert default values
        await axios.post('https://nodejs-production-9ea4.up.railway.app/valores', {
          id: 1,
          sessionIndividual: '0',
          sessionGroup: '0',
          linkIndividual: '',
          linkGrupal : ''
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
        const response = await axios.get('https://nodejs-production-9ea4.up.railway.app/valores');
        const sessionIndividual = response.data[0].sessionIndividual;
        const sessionGroup = response.data[0].sessionGroup;
        const linkIndividual = response.data[0].linkIndividual;
        const linkGrupal = response.data[0].linkGrupal;
        // Set the fetched values as the initial state for the inputs
        setSessionIndividual(sessionIndividual);
        setSessionGroup(sessionGroup);
        setLinkIndividual(linkIndividual);
        setLinkGrupal(linkGrupal);
      } catch (error) {
        console.error('Error fetching values:', error);
      }
    };

    getValues();
  }, []);





  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`https://nodejs-production-9ea4.up.railway.app/turnos/${eventId}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      toast.success('Turno eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar turno:', error);
    }
  };


 const getEvents = async () => {
  try {
    const response = await axios.get('https://nodejs-production-9ea4.up.railway.app/turnos');
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

          <div style={{ marginRight: '10px' }}>
            {event.nombre}
          </div>

          <div style={{ flexDirection: 'column' }}>
            <div>{event.telefono}</div>
          </div>
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
      linkIndividual,
      linkGrupal
    };
console.log(eventData)
    try {
      await axios.put('https://nodejs-production-9ea4.up.railway.app/valores', eventData);
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

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    if (name === 'linkIndividual') {
    
      setLinkIndividual(value);
    } else if (name === 'linkGrupal') {
 
      setLinkGrupal(value);
    }
  };


  const eventStyleGetter = (event) => {
    let style = {};

    if (event.paymentType === 'Grupal') {
      style = {
        backgroundColor: 'rgba(132, 78, 202, 1)',
        borderRadius: '5px',
        color: 'white',
        border: '1px solid #ccc',
      };
    }

    return {
      style,
    };
  };





  return (
    <div>
      <Calendar
        className="custom-calendar2"
        key={calendarKey}
        messages={messages}
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
        min={new Date(0, 0, 0, 13, 0, 0)}  // Hora mínima: 8:00 AM
        max={new Date(0, 0, 0, 17, 0, 0)}  // Hora máxima: 6:00 PM
        views={['day', 'work_week']}
        eventPropGetter={eventStyleGetter}
      />

<div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <a href="https://meet.google.com/qxa-auqe-zzd" className="btn btn-primary" style={{ background: '#4ECADI', color: 'white' }}>
            Unirse a la reunión
          </a>
        </div>


      {selectedEvent && (
        <div className="event-card-overlay" onClick={closeEventCard}>
          <EventCard event={selectedEvent} onClose={closeEventCard} />
        </div>
      )}

      <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="container d-flex flex-column justify-content-center align-items-center ">
          <div className="row">
            <div className="col">
              <h6>Actualizar los valores de las sesiones</h6>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <span>Individual</span>
              <input
                type="number"
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
                type="number"
                className="form-control"
                placeholder="Sesión grupal"
                value={sessionGroup || ''}
                name="sessionGroup"
                onChange={handleInputChange}
              />
            </div>
          </div>


    
            <div className="col">
              <span>Link Individual</span>
              <input
                type="text"
                className="form-control"
                placeholder="Link individual"
                value={linkIndividual || ''}
                name="linkIndividual"
                onChange={handleLinkChange}
              />
            </div>
            <div className="col">
              <span>Link Grupal</span>
              <input
                type="text"
                className="form-control"
                placeholder="Link grupal"
                value={linkGrupal || ''}
                name="linkGrupal"
                onChange={handleLinkChange}
              />
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
