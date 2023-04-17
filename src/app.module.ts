import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { TurnosModule } from './turnos/turnos.module';
import { HistorialModule } from './historial/historial.module';
import { SoapModule } from 'nestjs-soap';
import { GatewayModule } from './gateway/gateway.module';
import * as cors from 'cors';
@Module({
  imports: [
    SoapModule.register(
      { clientName: 'MY_SOAP_CLIENT', uri: 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl' },
    ),
    MongooseModule.forRoot('mongodb+srv://candelariasobol:8denoviembre@mongodb101.hkeu0q5.mongodb.net/test'), UserModule, MascotasModule, TurnosModule, HistorialModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
