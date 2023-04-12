import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/prueba/:numero')
  async priceDelivery(@Param('numero') numero: number): Promise<any>{
    return this.appService.callService(numero);
  }
}
