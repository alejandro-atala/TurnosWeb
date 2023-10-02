

import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('messages')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendEmail( @Body('email') email: string, @Body('hora') hora: string,  @Body('dia') dia: string ): Promise<string> {
    try {
   
      await this.twilioService.sendEmail(email, hora, dia);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      return 'Error al enviar el correo electrónico.';
    }
  }

  @Post('sendWsp')
  async sendWhatsAppMessage(@Body('phoneNumber') phoneNumber: string, @Body('message') message: string): Promise<string> {
    console.log(phoneNumber,message)
    try {
      await this.twilioService.sendWhatsAppMessage(phoneNumber, message);
      return 'WhatsApp message sent successfully!';
    } catch (error) {
      return 'Error sending WhatsApp message.';
    }
  }
}
