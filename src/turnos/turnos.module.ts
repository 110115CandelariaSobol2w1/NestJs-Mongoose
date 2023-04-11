import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Turnos, turnoSchema } from './schema/turnos.schema';
import { HistorialModule } from 'src/historial/historial.module';
import { HistoriaClinica, HistoriaSchema } from 'src/historial/schema/historia.schema';
import { Mascotas, mascotaSchema } from 'src/mascotas/schema/mascotas.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Turnos.name,
        schema: turnoSchema
      },
      {
        name: HistoriaClinica.name,
        schema: HistoriaSchema
      },
      {
        name: Mascotas.name,
        schema: mascotaSchema
      }
    ]),
    HistorialModule
  ],
  controllers: [TurnosController],
  providers: [TurnosService]
})
export class TurnosModule {}
