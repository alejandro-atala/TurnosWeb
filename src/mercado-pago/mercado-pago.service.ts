import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import {MERCADOPAGO_API_KEY} from '../../client/src/config'

@Injectable()
export class MercadoPagoService {
  constructor() {
    // Configure MercadoPago con tu token de acceso aquí
    mercadopago.configure({
      access_token: MERCADOPAGO_API_KEY,
    });
  }

  createPreference(preferenceData) {
    return mercadopago.preferences.create(preferenceData);
  }
}
