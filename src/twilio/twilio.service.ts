// // twilio.service.ts

// import { Injectable } from '@nestjs/common';
// import * as twilio from 'twilio';

// @Injectable()
// export class TwilioService {
//   private readonly accountSid = 'AC081b6004b196f8a73162c388c972f9b7';
//   private readonly authToken = '92726431de6cd24365c079757bd553d0';
//   private readonly client: twilio.Twilio;

//   constructor() {
//     this.client = twilio(this.accountSid, this.authToken);
//   }

//   async sendMessage(body: string, to: string, from: string) {
//     try {
//       const message = await this.client.messages.create({
//         body,
//         to,
//         from,
//       });
//       console.log('Message sent with SID:', message.sid);
//       return message.sid;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw new Error('Failed to send message');
//     }
//   }
// }




import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aledorrego89@gmail.com',
    pass: 'vhgp uohc igdd sqxa'
  }
});





export class TwilioService {
  async sendEmail(to: string, subject: string, text: string): Promise<void> {


    const emailContent = `
  <div style="background-color:rgba(78, 202, 155, 0.618); padding: 20px;">
    <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333;">Reserva de turno</h2>
      <p>${text}</p>

      <p>Gracias por su reserva.</p>
    </div>
  </div>
`;


    console.log('enviando mail...')
    const mailOptions = {
      from: 'aledorrego89@gmail.com',
      to,
      subject,
      html: emailContent
    };
console.log(mailOptions);
    await transporter.sendMail(mailOptions);
  }
}