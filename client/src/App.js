// App.js

import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/Home/Home';
import Calendario from '../src/Calendario/Calendario'; // Importa tu componente de Calendario
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuarios from '../src/Usuario/Usuarios';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/admin" element={<Calendario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
