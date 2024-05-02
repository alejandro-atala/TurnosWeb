
import { Link } from 'react-router-dom';
import './Masajista.css';
import React, { useState } from 'react';

const Psicologa = () => {



    const handleCardLinkClick = (cardContent) => {
        showCardOverlay(cardContent);
    };


    const showCardOverlay = (cardContent) => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.overflowY = 'auto';

        const cardContainer = document.createElement('div');
        cardContainer.style.position = 'relative';  // Adjusted positioning
        cardContainer.style.margin = '10vh auto';  // Added margin to center vertically
        cardContainer.style.background = 'linear-gradient(to bottom, rgba(78, 202, 155, 1), rgba(255, 255, 255, 1))';
        cardContainer.style.padding = '20px';
        cardContainer.style.maxHeight = 'auto';  // Adjusted max height
        cardContainer.style.width = '80%';  // Adjusted width
        cardContainer.style.textAlign = 'center';
        cardContainer.style.borderRadius = '10px';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'x';
        closeButton.style.color = 'blue';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '-20px';
        closeButton.style.right = '-5px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.background = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '30px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
          
        });

        cardContainer.innerHTML = cardContent;

        cardContainer.appendChild(closeButton);
        overlay.appendChild(cardContainer);
        document.body.appendChild(overlay);
    };




    return (
        <div className="masaje-container ">
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h1>Maria Perez</h1>
                <h3>Masajista</h3>
                <div className="profile-image">
                    <img src="https://images4.imagebam.com/8d/c1/79/MEQRSW0_o.jpeg" alt="Foto de perfil" />
                </div>
                <p>
                    🔹<a href="#" onClick={() => handleCardLinkClick(`
            <h2>Terapia 1a1 y grupales. ONLINE</h2>
            <p>La terapia psicológica 1 a 1 y grupal son dos modalidades comunes en el ámbito de la psicología utilizadas para abordar distintas necesidades y problemáticas emocionales y conductuales de las personas.
            <br /><br />
           <b> Terapia Psicológica 1 a 1:</b>
            También conocida como terapia individual, es un enfoque en el que un psicólogo trabaja directamente con un único individuo. Durante las sesiones, el terapeuta y el cliente establecen un vínculo de confianza y colaboración en un ambiente seguro y confidencial. El objetivo principal es explorar los pensamientos, emociones y comportamientos del cliente, así como identificar y comprender los desafíos personales y las dificultades que enfrenta. A través de técnicas terapéuticas específicas, el terapeuta ayuda al individuo a desarrollar habilidades para manejar sus problemas de manera más efectiva, mejorar su bienestar emocional y alcanzar sus metas personales.
            <br /><br />
            <b>Terapia Psicológica Grupal: </b>
            Implica que un psicólogo dirija un grupo de personas que comparten una problemática o temática en común. Estos grupos pueden variar en tamaño y pueden enfocarse en diferentes áreas, como ansiedad, depresión, habilidades sociales, entre otros. Durante las sesiones, los miembros del grupo tienen la oportunidad de compartir sus experiencias, emociones y desafíos con los demás participantes. El terapeuta facilita la comunicación, fomenta el apoyo mutuo, brinda orientación y utiliza diversas técnicas terapéuticas para promover el crecimiento personal y el cambio positivo en cada miembro del grupo. La dinámica grupal puede proporcionar un sentido de pertenencia, comprensión y validación emocional, así como oportunidades para aprender de las experiencias de los demás y practicar habilidades sociales y de afrontamiento. </p>
          `)}>Terapia 1a1 y grupales. ONLINE</a> <br /><br />
                    🔹<a href="#" onClick={() => handleCardLinkClick(`
            <h2>Educación Emocional</h2>
            <p>La educación emocional es un proceso que busca fortalecer la inteligencia emocional de las personas, permitiéndoles comprender, expresar y regular adecuadamente sus emociones. Es un enfoque educativo que va más allá de la adquisición de conocimientos académicos y se centra en el desarrollo de habilidades emocionales y sociales fundamentales para la vida diaria.
            <br /><br />
            <b>Comprensión de las Emociones:</b>
            La educación emocional implica aprender a reconocer, comprender y etiquetar nuestras emociones y las emociones de los demás. Esto incluye identificar diferentes estados emocionales, entender sus causas y efectos, y desarrollar vocabulario emocional para describir lo que sentimos.
            <br /><br />
             <b>Expresión Saludable:</b>
            Se enseña a las personas a expresar sus emociones de manera adecuada y constructiva. Esto implica aprender a comunicar lo que sentimos de manera asertiva, evitando la agresión o la represión de emociones, y considerando el impacto de nuestras expresiones en los demás.
            <br /><br />
            <b> Regulación Emocional:</b>
            La educación emocional también se centra en desarrollar estrategias para regular nuestras emociones. Esto incluye técnicas de autorregulación, manejo del estrés, resolución de conflictos y toma de decisiones basada en la inteligencia emocional.
            <br /><br />
            <b>Empatía y Relaciones Sociales:</b>
            Se fomenta la empatía, que es la capacidad de ponerse en el lugar de otra persona y comprender sus sentimientos. Asimismo, se promueve la construcción de relaciones sociales positivas y saludables, basadas en la comprensión y el respeto mutuo.
            <br /><br />
            <b>Toma de Conciencia de Uno Mismo:</b>
            La educación emocional alienta a las personas a reconocer sus fortalezas y debilidades, a entender sus propias metas y valores, y a trabajar en su autoaceptación y autoestima.
            <br /><br />
            La educación emocional tiene un impacto significativo en el bienestar emocional, la toma de decisiones, la salud mental y el éxito en diversos ámbitos de la vida. Al adquirir habilidades emocionales sólidas, las personas pueden enfrentar los desafíos de la vida de manera más efectiva y construir relaciones interpersonales más positivas y satisfactorias. </p>
          `)}>Educación Emocional</a> <br /><br />
                    🔹<a href="#" onClick={() => handleCardLinkClick(`
            <h2>Mindfulness y yoga</h2>
            <p>Mindfulness y yoga son dos prácticas que han ganado popularidad en todo el mundo debido a sus beneficios para la salud mental, física y emocional. Aunque son diferentes en su enfoque y práctica, ambos tienen como objetivo principal fomentar la atención plena y el bienestar integral.
            <br /><br />
           <b> Mindfulness:</b>
            El mindfulness es la práctica de prestar atención consciente y deliberada al momento presente, sin juzgarlo. Involucra una atención plena a nuestras experiencias, pensamientos, emociones y sensaciones corporales en el momento actual. Esta práctica nos ayuda a desarrollar la conciencia plena de nuestras reacciones ante las circunstancias, permitiéndonos responder de manera más consciente en lugar de reaccionar impulsivamente. El mindfulness se ha asociado con la reducción del estrés, la mejora de la concentración, la regulación emocional y el aumento de la satisfacción y el bienestar en general.
            <br /><br />
             <b>Yoga:</b>
            El yoga es una disciplina física, mental y espiritual originada en la India que busca el equilibrio y la armonía entre el cuerpo, la mente y el espíritu. Incluye posturas físicas (asanas), técnicas de respiración (pranayama) y meditación. El yoga no solo se enfoca en la flexibilidad y el fortalecimiento físico, sino también en la calma mental y la conexión con uno mismo. A través de la práctica del yoga, las personas pueden experimentar una mayor conciencia corporal, reducción del estrés, mejora de la flexibilidad, concentración y bienestar general.
            <br /><br />
            Ambas prácticas, mindfulness y yoga, se complementan y se utilizan para ayudar a las personas a gestionar el estrés, mejorar su bienestar emocional, encontrar la paz interior, cultivar la atención plena y promover un estilo de vida más equilibrado. Introducir estas prácticas en la rutina diaria puede contribuir a un mayor autoconocimiento, reducción de la ansiedad y promoción de la salud física y mental. </p>
          `)}>Mindfulness y yoga</a> <br /><br />
                    🔹<a href="#" onClick={() => handleCardLinkClick(`
            <h2>Ansiedad</h2>
            <p>La ansiedad es una respuesta natural y adaptativa que experimenta una persona ante situaciones de peligro, estrés o incertidumbre. Es una emoción que prepara al organismo para reaccionar frente a desafíos y amenazas. Sin embargo, cuando la ansiedad se vuelve excesiva, persistente e interfiere con la vida diaria, puede convertirse en un trastorno de ansiedad.
            <br /><br />
             <b>Síntomas:</b>
               Los síntomas de la ansiedad pueden incluir preocupación constante, nerviosismo, tensión muscular, inquietud, dificultad para concentrarse, irritabilidad, insomnio, fatiga, palpitaciones rápidas y problemas gastrointestinales.
               <br /><br />
             <b>Trastornos de Ansiedad Comunes:</b>
               Algunos trastornos de ansiedad incluyen trastorno de ansiedad generalizada (TAG), trastorno de pánico, fobias específicas, trastorno obsesivo-compulsivo (TOC), trastorno de estrés postraumático (TEPT) y trastorno de ansiedad social.
               <br /><br />
             <b>Causas:</b>
               Las causas pueden ser diversas, incluyendo factores genéticos, desequilibrios químicos en el cerebro, experiencias traumáticas, estrés crónico, enfermedades médicas y ciertos medicamentos.
               <br /><br />
             <b>Tratamiento:</b>
               El tratamiento para la ansiedad puede incluir terapia cognitivo-conductual (TCC), terapia de relajación, técnicas de respiración, meditación, ejercicio físico, cambios en el estilo de vida y, en algunos casos, medicamentos recetados. La elección del tratamiento dependerá de la gravedad de la ansiedad y las preferencias individuales.
               <br /><br />
             <b>Gestión:</b>
               La gestión de la ansiedad implica aprender a reconocer y comprender los desencadenantes de la ansiedad, así como desarrollar estrategias de afrontamiento efectivas. Estas pueden incluir la práctica regular de técnicas de relajación, ejercicio físico, alimentación equilibrada, sueño adecuado y el apoyo social. </p>
          `)}>Ansiedad</a><br /><br />
                    🔹<a href="#" onClick={() => handleCardLinkClick(`
            <h2>Estrés</h2>
            <p>

            El estrés es una respuesta natural y adaptativa del organismo ante situaciones que percibimos como desafiantes, amenazantes o demandantes. Es una reacción que prepara al cuerpo para enfrentar o huir de una situación de peligro (respuesta de "lucha o huida"). Sin embargo, cuando esta respuesta se activa de forma continua o excesiva, puede convertirse en un problema de salud significativo.
            <br /><br />
             <b>Síntomas:</b>
               Los síntomas del estrés pueden variar y afectar tanto al cuerpo como a la mente. Pueden incluir tensión muscular, fatiga, dificultad para dormir, cambios de apetito, irritabilidad, ansiedad, falta de concentración, entre otros.
               <br /><br />
             <b>Fuentes de Estrés:</b>
               Las fuentes de estrés pueden ser variadas e incluir presiones laborales, problemas personales, cambios importantes en la vida, relaciones interpersonales conflictivas, preocupaciones financieras, entre otros.
               <br /><br />
             <b>Efectos en la Salud:</b>
               El estrés crónico puede tener un impacto negativo en la salud física y mental. Puede contribuir a problemas como enfermedades cardiovasculares, trastornos digestivos, trastornos del sueño, ansiedad, depresión y agotamiento.
               <br /><br />
            <b>Gestión del Estrés:</b>
               La gestión efectiva del estrés implica aprender estrategias y técnicas para manejar las situaciones estresantes de manera más saludable. Algunas estrategias incluyen la práctica de ejercicio físico regular, técnicas de relajación (como la meditación y la respiración profunda), establecimiento de límites y prioridades, organización y planificación adecuada, establecimiento de rutinas y tiempo para el autocuidado.
               <br /><br />
          
            Es esencial reconocer los signos de estrés y tomar medidas para gestionarlo de manera saludable. La prevención y el manejo adecuado del estrés son fundamentales para mantener un equilibrio emocional y una buena calidad de vida a largo plazo. Si el estrés se vuelve abrumador o persistente, buscar ayuda profesional es una decisión importante para abordar este problema de manera efectiva. </p>
          `)}>Estrés</a><br /><br />
                </p>
                <Link to="/usuarios">
                    <button>Reservar turno</button>
                </Link>



            </div>  </div>
    );
}





export default Psicologa;
