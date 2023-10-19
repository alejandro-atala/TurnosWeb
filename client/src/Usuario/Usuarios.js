import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Usuario.css'
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
const Usuarios = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null); // Initialize with a default value
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [alertType, setAlertType] = useState('success'); // State for alert type
  const [valores, setValores] = useState();
  const navigate = useNavigate();
  const [linkIndividual, setLinkIndividual] = useState('');
  const [linkGrupal, setLinkGrupal] = useState('');
  const [sessionIndividual, setSessionIndividual] = useState('');
  const [sessionGroup, setSessionGroup] = useState('');
  const handleDOMContentLoaded = () => {
    // Call your function here that requires the DOM to be loaded

  };



  const showAlert = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'danger') {
      toast.error(message);
    }
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

    const formattedStart = moment(start).locale('es').format('LL LT');  // Formatea la fecha de inicio en español
    const formattedEnd = moment(end).locale('es').format('LL LT');      // Formatea la fecha de fin en español

    const currentDate = moment()

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
      console.log(selectedEvent.paymentType)

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
        PaymentDetailsPage(formData.paymentOption, formData.email, formData.nombre, eventData.paymentType, formattedStart);
        // handleFormSubmit(formData.email, "Turno Psicologia", `Hola ${formData.nombre}, usted reservó un turno ${eventData.paymentType} el día ${formattedStart} hs`);
     //   updatePaymentDetails(formData.paymentOption, formattedStart);

        localStorage.setItem('eventData', JSON.stringify(eventData));

        try {
          const response = await axios.post('https://turnos.cleverapps.io/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          setEvents([...events, newEvent]);



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
        PaymentDetailsPage(formData.paymentOption, formData.email, formData.nombre, eventData.paymentType, formattedStart);
        // handleFormSubmit(formData.email, "Turno Psicologia", `Hola ${formData.nombre}, usted reservó un turno  ${eventData.paymentType} el día ${formattedStart} hs`);
     //   updatePaymentDetails(formData.paymentOption, formattedStart);

        localStorage.setItem('eventData', JSON.stringify(eventData));


        try {
          const response = await axios.post('https://turnos.cleverapps.io/turnos/reservar', eventData);
          const newEvent = {
            ...eventData,
            id: response.data.id,
          };
          setEvents([...events, newEvent]);

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

     
      PaymentDetailsPage(formData.paymentOption, formData.email, formData.nombre, eventData.paymentType, formattedStart);
      // handleFormSubmit(formData.email, "Turno Psicologia", `Hola ${formData.nombre}, usted reservó un turno ${eventData.paymentType} el día ${formattedStart} hs `);
     // updatePaymentDetails(formData.paymentOption, formattedStart);

      localStorage.setItem('eventData', JSON.stringify(eventData));


      try {
        const response = await axios.post('https://turnos.cleverapps.io/turnos/reservar', eventData);
        const newEvent = {
          ...eventData,
          id: response.data.id,
        };
        setEvents([...events, newEvent]);

      } catch (error) {
        console.error('Error al reservar turno:', error);
      }
    }

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
          <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre " required />
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


  const PaymentDetailsPage = (selectedOption, email,   nombre, tipo,message) => {
    console.log(selectedOption);

    let monto = 0

    if (selectedOption === 'Individual') {
      monto = sessionIndividual
    } else if (selectedOption === 'Grupal') {
      monto = sessionGroup
    }


    const bankAccounts = [
      {
        id: 1,
        accountNumber: ' CBU: 0140341903624551649238',
        accountAlias: 'MICA.PSICOLOGA',
         monto: monto,
        imageSrc: 'https://1.bp.blogspot.com/-c14djmRpuVw/Xs-gapZyabI/AAAAAAAA9zE/VraQb8VWlXs3CRJkNR2GymG-ubo40-woQCLcBGAsYHQ/s1600/CUENTA%2BDNI.jpg',
      },
      {
        id: 2,
        accountNumber: 'CVU: 0000003100086271244952',
        accountAlias: 'MICA.PSICOLOGA.MP',
        monto: monto,
        imageSrc: 'https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png',
      },

    ];

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '1000';
    overlay.style.overflowY = 'auto';  // Enable vertical scrolling
  
    const formContainer = document.createElement('div');
    formContainer.style.position = 'absolute';
    formContainer.style.top = '50%';
    formContainer.style.left = '50%';
    formContainer.style.transform = 'translate(-50%, -50%)';
    formContainer.style.backgroundColor = 'rgba(78, 202, 155,1)';
    formContainer.style.padding = '20px';
    formContainer.style.width = 'auto'; // Set a fixed width or adjust as needed
    formContainer.style.maxHeight = '100%';  // Set a max height to enable vertical scrolling
    //formContainer.style.overflowY = 'auto';  // Enable vertical scrolling
    formContainer.style.textAlign = 'center';
    formContainer.style.borderRadius = '10px';
  
    formContainer.innerHTML = `
      <div className="container text-center">
 
        <div className="justify-content-center">
          ${bankAccounts
          .map(
            (account) => `
              <div key=${account.id} className="card col-md-3 m-2">
                <img src=${account.imageSrc} alt=${''} class="card-img-top" style="width: ${150}px" />
                <div className="card-body">
                  <p className="card-text"> <b> ${account.accountNumber}</b></p>
                  <p className="card-text" id="cbu">Alias: <b> ${account.accountAlias}</b></p>
                  <p className="card-text" id="alias">Valor: <b> $ ${account.monto}</b></p>
                  <hr>
                </div>
              </div>
            `
          )
          .join('')}
        </div>
        
        <div className="mt-3">
          <button type="button" class="btn btn-primary mt-3" id="linkpago">Link de Pago</button>
        </div>
        <div className="mt-3">
          <button type="button" class="btn btn-success mt-3" id="handleScheduleAppointment">Ya Pagué</button>
          <button type="button" class="btn btn-secondary mt-3" id="handleCancelReservation">Cancelar</button>
        </div>
      </div>
    `;
    ;
    

    overlay.appendChild(formContainer);
    document.body.appendChild(overlay);

    const cancelButton = formContainer.querySelector('#handleCancelReservation');
    cancelButton.addEventListener('click', () => {
 

      document.body.removeChild(overlay);
      formContainer.remove();
      handlePaymentFailure();
    });

    const pagoButton = formContainer.querySelector('#handleScheduleAppointment');
    pagoButton.addEventListener('click', () => {
      handleFormSubmit(email, nombre, tipo, message);
      toast.success('Turno guardado. Recibira un email con los datos de la reserva');
      getEvents();
      document.body.removeChild(overlay);
      formContainer.remove();
      return
    });

    const linkpago = formContainer.querySelector('#linkpago');
    linkpago.addEventListener('click', () => {
      console.log("linkpago clicked")


      console.log(selectedOption)

      if (selectedOption === 'Individual') {
        openLinkInNewTab(linkIndividual);
      } else if (selectedOption === 'Grupal') {
        openLinkInNewTab(linkGrupal);
      } else {
        openLinkInNewTab('');
      }

    });

    return () => {
      // Cleanup function to remove the overlay when the component unmounts
      document.body.removeChild(overlay);
    };
  };

  const openLinkInNewTab = (url) => {
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error('No se pudo abrir una nueva pestaña.');
    }
  };




  // Update payment details based on the selected option
  const updatePaymentDetails = async (selectedOption, formattedStart) => {
    if (selectedOption) {

      // Fetch "valores" from the server
      try {
        const response = await axios.get('https://turnos.cleverapps.io/valores');
        const valores = response.data;

        // Assuming your "valores" response is an array with sessionIndividual and sessionGroup values
        const sessionIndividual = valores[0].sessionIndividual;
        const sessionGroup = valores[0].sessionGroup;


        // Use sessionIndividual and sessionGroup in your updatePaymentDetails function
        let paymentTitle = `Reserva de turno - Sesion individual - ${formattedStart} hs`;
        let paymentAmount = parseFloat(sessionIndividual);

        if (selectedOption === 'Grupal') {
          paymentTitle = `Reserva de turno - Sesion grupal - ${formattedStart} hs`;
          paymentAmount = parseFloat(sessionGroup);
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
            success: 'https://localhost:3001/usuarios',
            failure: 'https://localhost:3001/usuarios?payment_failure=true',
            pending: 'https://localhost:3001/usuarios?payment_pending=true',
          },
        };

        console.log('Updated Payment Details:', preferenceData);

        try {
          const response = await axios.post('https://turnos.cleverapps.io/mercadopago/create_preference', preferenceData);
          const preferenceId = response.data.id;

          window.location.href = `httpss://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;

        } catch (error) {
          console.error('Error al crear la preferencia de MercadoPago:', error);
        }
      } catch (error) {
        console.error('Error fetching valores:', error);
      }
    } else {
      console.error('No payment option selected.');
    }
  };


const getValores = async () => {
  const response = await axios.get('https://turnos.cleverapps.io/valores');
  const valores = response.data;

  // Assuming your "valores" response is an array with sessionIndividual and sessionGroup values
  const sessionIndividual = valores[0].sessionIndividual;
  const sessionGroup = valores[0].sessionGroup;
  const linkIndividual = response.data[0].linkIndividual;
  const linkGrupal = response.data[0].linkGrupal;

console.log(linkIndividual,linkGrupal);

setSessionIndividual(sessionIndividual)
setSessionGroup(sessionGroup)
  setLinkIndividual(linkIndividual);
  setLinkGrupal(linkGrupal);
}


  const getEvents = async () => {
    try {
      const response = await axios.get('https://turnos.cleverapps.io/turnos');
      const formattedEvents = response.data.map(event => ({
        ...event,
        id: event.id,
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.paymentType,


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
        await axios.delete(`https://turnos.cleverapps.io/turnos/borrar/${selectedEvent.eventId}`);
        toast.error('El turno ha sido eliminado debido a que el pago no se realizó correctamente.');
        getEvents();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    }
  };





  useEffect(() => {
    getEvents();
    getValores();
    toast.info(`Mantenga presionado para reservar un turno`);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentFailure = urlParams.get('payment_failure');
    if (paymentFailure) {
      handlePaymentFailure();
    }
  }, []);



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





  const handleFormSubmit = async (email, nombre, paymentType, dia) => {

    try {
      // Envia los datos en la solicitud POST
      let response = await axios.post('https://turnos.cleverapps.io/messages/send', {
        email: email ,
        hora:  "Turno Psicologia",
        dia: ` Hola ${nombre}, usted reservó un turno ${paymentType} el día <b>${dia}</b> hs. <br>
        <p> Con el siguiente boton podrá ingresar a la reunión en el día y horario que reservó su turno:</p>

        <div style=" display: flex; justify-content: center; margin: 20px;">
        <a href="https://meet.google.com/qxa-auqe-zzd" style="text-decoration: none;">
          <button
            style="
              background: blue;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            "
          >
            Unirse a la reunión
          </button>
        </a>
      </div>

      <br><br>
      <p>Si desea cancelar el turno, debe realizarlo con al menos <b>24 hs </b> de anticipacion para reintegrarle su dinero, dando aviso en el siguiente enlace</p>

      <div style=" display: flex; justify-content: center; margin: 20px;">
      <a href="https://api.whatsapp.com/send?phone=+542914715654&text=Hola%2C%20necesito%20cancelar%20el%20turno" style="text-decoration: none;">
        <button
          style="
            background: green;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          "
        >
          Enviar Whatsapp
        </button>
      </a>
    </div>
      

</a>


      `
      });

          // Envia los datos en la solicitud POST
          response = await axios.post('https://turnos.cleverapps.io/messages/send', {
            email: 'micapsicologa@gmail.com',
            hora:  "Nuevo turno",
            dia: `  ${nombre},  reservó un turno ${paymentType} el día ${dia} hs`
          });

      console.log('Solicitud POST exitosa:', response.data);
      // Realiza las acciones que necesites después de enviar los datos
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };





  return (
    <div>

      <div className=' mx-auto text-center col-3 '>
        <ToastContainer position="top-center" autoClose={4000} />
        <div className='mx-auto text-center col-3'>

        </div>       </div>
      <Calendar
        className="custom-calendar"
        messages={messages}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectEvent={handleSelect}
        onSelectSlot={handleSelect}
        timeslots={1}
        step={60}
        defaultView={'work_week'}
        min={new Date(0, 0, 0, 13, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        views={['day', 'work_week']}
        eventPropGetter={eventStyleGetter}  // Aplica estilos a los eventos
      /><br></br>
      <footer className="fixed-bottom bg-light text-center">
  <p className="m-0">
    Diseñado por Alejandro -{" "}
    <a href="https://api.whatsapp.com/send?phone=5492921401356">2921-401356</a>
    
  </p>
</footer>

    </div>

  );
};

export default Usuarios;


