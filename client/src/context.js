import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const ProfessionalContext = createContext();

// Crea el proveedor del contexto
export const ProfessionalProvider = ({ children }) => {
  const [selectedProfessional, setSelectedProfessional] = useState('');

  const handleProfessionalChange = (professional) => {
    setSelectedProfessional(professional);
  };

  return (
    <ProfessionalContext.Provider value={{ selectedProfessional, handleProfessionalChange }}>
      {children}
    </ProfessionalContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useProfessionalContext = () => {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error('useProfessionalContext debe ser utilizado dentro de un ProfessionalProvider');
  }
  return context;
};
