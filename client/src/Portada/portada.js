import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useProfessionalContext } from '../context';

const Portada = () => {
  const { selectedProfessional, handleProfessionalChange } = useProfessionalContext();

  const handleProfessionalSelect = (e) => {
    handleProfessionalChange(e.target.value);
  };

  return (
    <Container
      className='d-flex align-items-center justify-content-center mt-5'
      style={{ maxWidth: '400px', minHeight: '300px' }}
    >
      <Row>
        <Col>
          <h2 className="text-center">Selecciona un profesional</h2>
          <Form>
            <Form.Group controlId="professionalSelect">
              <Form.Control
                as="select"
                value={selectedProfessional}
                onChange={handleProfessionalSelect}
              >
                <option value="">Seleccione profesional</option>
                <option value="psicologa">Psicóloga - Micaela Gonzalez</option>
                <option value="masajista">Masajista - Maria Perez</option>
                <option value="yoga">Yoga - Pedro Ramirez</option>
                {/* Agrega más opciones para otros profesionales */}
              </Form.Control>
            </Form.Group>
          </Form>
          <div className="text-center mt-5">
            <Link to={`/${selectedProfessional}`}>
              <Button variant="primary">Ir al profesional</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Portada;
