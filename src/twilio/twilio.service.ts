

import * as nodemailer from 'nodemailer';
import * as twilio from 'twilio';

const accountSid = 'AC081b6004b196f8a73162c388c972f9b7';
const authToken = '55c13411b88e04f6b80748b76d333f0e';
const twilioPhoneNumber = '+18063047849';

const client = twilio(accountSid, authToken);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'micapsicologa@gmail.com',
    pass: 'boxb vede avht ygha'
  }
});





export class TwilioService {
  async sendEmail(para: string, subject: string, text: string): Promise<void> {


    const emailContent = `
    <div style="background-color: rgba(78, 202, 155, 0.618); padding: 20px;">
      <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Reserva de turno</h2>
        <p>${text}</p>
  
  
        
        <p>Gracias por su reserva.</p>
      </div>
    </div>
  `;
  
  


    console.log('enviando mail...')
    let mailOptions = {
      from: 'micapsicologa@gmail.com',
      to: para, 
      subject,
      html: emailContent
    };
console.log(mailOptions);
    await transporter.sendMail(mailOptions);


  }


  async sendWhatsAppMessage(to: string, body: string): Promise<void> {
    try {
      await client.messages.create({
        body,
        from: twilioPhoneNumber,  // Replace with your Twilio WhatsApp number
        to: `${to}`
      });
      console.log('WhatsApp message sent successfully');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw new Error('Error sending WhatsApp message');
    }
  }
}
