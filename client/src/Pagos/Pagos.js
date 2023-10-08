import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentDetailsPage = () => {
  

    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    const handleCancelReservation = () => {
        console.log('Cancelando la reserva para el evento:', selectedEvent);
      
        navigate('/usuarios'); // Volver a la página anterior
       
    };
  
    const handleScheduleAppointment = () => {
    
      
        console.log('Agendando el turno para el evento:', selectedEvent);
        navigate('/usuarios'); // Volver a la página anterior
    };


    
  


  const bankAccounts = [
    {
      id: 1,
      accountNumber: '1234567890',
      bankName: 'Banco A',
      imageSrc: 'url_de_la_imagen_1',
    },
    {
      id: 2,
      accountNumber: '0987654321',
      bankName: 'Banco B',
      imageSrc: 'url_de_la_imagen_2',
    },
    {
      id: 3,
      accountNumber: '2468013579',
      bankName: 'Banco C',
      imageSrc: 'url_de_la_imagen_3',
    },
  ];


  return (
    <div className="container text-center">
    <h2>Datos de Cuentas Bancarias</h2>
    <div className=" justify-content-center">
      {bankAccounts.map(account => (
        <div key={account.id} className="card col-md-3 m-2">
          <img src={account.imageSrc} alt={`Logo de ${account.bankName}`} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title">Banco: {account.bankName}</h3>
            <p className="card-text">Número de cuenta: {account.accountNumber}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-3">
        <button onClick={handleScheduleAppointment} className="btn btn-success mr-2">Ya pagué</button>
        <button onClick={handleCancelReservation} className="btn btn-danger">Volver</button>
      </div>
  </div>
);
};


export default PaymentDetailsPage;
