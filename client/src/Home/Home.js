// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import InicioSesion from '../Login/Login';

const Home = () => {
    return (
        <div className="home-container ">
    <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h1>Micaela Gonzalez</h1>
                <h3>Psicologa</h3>
                <div className="profile-image">
                    <img src="https://images4.imagebam.com/be/4c/6f/MEP03N1_o.jpg" alt="Foto de perfil" />
                </div>
                <p>
                    🔹Terapia 1a1 y grupales. ONLINE <br /><br />
                    🔹Educación Emocional <br /><br />
                    🔹Mindfulness y yoga <br /><br />
                    🔹Ansiedad <br /><br />
                    🔹Estrés <br /><br />
                    
                </p>
                <Link to="/usuarios">
                    <button>Reservar turno</button>
                </Link>
            </div>
         
        </div>
    );
};

export default Home;
