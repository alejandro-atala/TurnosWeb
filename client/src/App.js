import React, { useState, useEffect } from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/Home/Home';
import Calendario from '../src/Calendario/Calendario';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Simulación de autenticación exitosa
    if (username === 'micaela' && password === '26Diciembre86') {
      setIsLoggedIn(true);
      setShowAlert(false); // Oculta el alert si estaba visible
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
      setShowAlert(true);
      // Oculta el alert después de 2 segundos
      setTimeout(() => {
        setShowAlert(false);
        setError('');
      }, 2000);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Calendario />
            ) : (
              <div className="container col-3 bg-info  mt-5 rounded-4">
                {showAlert && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
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
              </div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
