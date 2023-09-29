import React from 'react';
import './Evento.css'; // Archivo de estilos CSS

const EventCard = ({ event, onClose }) => {
  return (
    <div className="event-card-overlay">
      <div className="event-card">
        <div className="event-card-content">
          <h3>{event.title}</h3>
          <p>Nombre: {event.nombre}</p>
          <p>Teléfono: {event.telefono}</p>
          <p>Tipo de Pago: {event.paymentType}</p>
         
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
