// // Ejemplo de uso en un controlador

// import { Controller, Get, Post } from '@nestjs/common';
// import { TwilioService } from './twilio.service';

// @Controller('messages')
// export class TwilioController {
//   constructor(private readonly twilioService: TwilioService) {}

//   @Post('send')
//   async sendTwilioMessage() {

//     try {
//       console.log('sendTwilioMessage')
//       await this.twilioService.sendMessage('Hello from twilio-node', '+14155238886', '+542921475076');
//       return 'Message sent successfully!';
//     } catch (error) {
//       return 'Failed to send message.';
//     }
//   }
// }



import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('messages')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendEmail( @Body('email') email: string, @Body('hora') hora: string,  @Body('dia') dia: string ): Promise<string> {
    try {
      console.log(email, hora, dia);
      await this.twilioService.sendEmail(email, hora, dia);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      return 'Error al enviar el correo electrónico.';
    }
  }
}
