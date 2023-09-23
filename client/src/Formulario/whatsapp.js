import React, { useEffect } from 'react';

const ConfirmacionComponent = () => {
  useEffect(() => {
    const enviarMensajeConfirmacion = async (numeroTelefono, mensaje) => {
      const accountSid = 'YOUR_ACCOUNT_SID';
      const authToken = 'YOUR_AUTH_TOKEN';
      const client = require('twilio')(accountSid, authToken);

      try {
        const message = await client.messages.create({
          body: mensaje,
          from: 'whatsapp:+14155238886', // Tu número de WhatsApp de Twilio
          to: `whatsapp:${numeroTelefono}`
        });
        console.log('Mensaje enviado con SID:', message.sid);
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    };

    // Llamada a la función para enviar el mensaje de confirmación
    enviarMensajeConfirmacion('NUMERO_DE_TELEFONO_USUARIO', 'Tu turno ha sido confirmado. Fecha y hora: YYYY-MM-DD HH:mm');
  }, []); // Se ejecuta solo en el montaje del componente

  return <div>Enviando mensaje de confirmación...</div>; // Puedes personalizar este mensaje
};

export default ConfirmacionComponent;
