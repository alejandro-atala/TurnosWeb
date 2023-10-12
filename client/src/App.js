import React, { useState, useEffect } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Usuarios from '../src/Usuario/Usuarios';
import Calendario from '../src/Calendario/Calendario';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../src/Home/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');





  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Simulación de autenticación exitosa
    if (username === 'Micaela' && password === '26Diciembre86') {
      setIsLoggedIn(true);
      toast.success('Inicio de sesión exitoso para el usuario: ' + username);
    } else {
    
      toast.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Calendario username={username} />
            ) : (
              <div className="container col-3 bg-info  mt-5 rounded-4">
                
                <h2 className="mb-4">Login</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuario:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                  </button>
                </form>
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            )
          }
        />
           <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
  

      </Routes>
    </BrowserRouter>
  );
};

export default App;
