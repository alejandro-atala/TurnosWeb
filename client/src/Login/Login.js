import React, { useState } from 'react';
// import './inicioSesion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const InicioSesion = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3000/usuarios?email=${formData.email}&password=${formData.password}`);

            if (response.data.length > 0) {
                // User found, you can navigate to a new page or perform actions accordingly
                console.log('User logged in:', response.data[0]);
                navigate('/dashboard'); // Navigate to the dashboard page
            } else {
                console.log('User not found. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    return (
        <div className="container rounded text-center col-xs-12 col-md-4 col-sm-3 p-5 mt-4 bg-sesion">
            <div className="row align-items-center">
                <div className="">
                    <h2 className="text-center">Iniciar sesión</h2>
                   
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> Recordarme
                            </label>
                        </div>
                        <button type="submit" id="btn-iniciar" className="btn btn-primary btn-block" onClick={handleSubmit}>
                            Iniciar sesión
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default InicioSesion;
