import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('/create_preference')
  async createPreference(@Body() preferenceData) {
    try {
      const response = await this.mercadoPagoService.createPreference(preferenceData);

      return { id: response.body.id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
