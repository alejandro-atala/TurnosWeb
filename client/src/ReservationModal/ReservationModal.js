import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReservationModal = ({ showModal, handleClose }) => {
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setReservationDetails({ ...reservationDetails, [id]: value });
  };

  const handleReservation = () => {
    // Do something with reservation details (e.g., send to server)
    // Add your logic here to handle the reservation
    console.log('Reservation Details:', reservationDetails);

    // Close the modal
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserva de turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su nombre y apellido" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su correo electrónico" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su teléfono" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleReservation}>
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
