// Formulario.js
import React from 'react';

const Formulario = ({ isIndividual, isGroup, handleCheckboxChange, handleSubmit }) => {
  return (
    <div>
      <h2>Ingrese sus datos</h2>
      <form id="reservationForm" onSubmit={handleSubmit}>
        {/* Resto del formulario... */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isIndividual}
              onChange={() => handleCheckboxChange('individual')}
            />
            Individual
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isGroup}
              onChange={() => handleCheckboxChange('group')}
            />
            Grupal
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary mt-3" id="cancelButton">
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
