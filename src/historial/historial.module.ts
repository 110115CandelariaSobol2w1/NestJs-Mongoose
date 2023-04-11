import { Module } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriaClinica, HistoriaSchema } from './schema/historia.schema';
import { Turnos, turnoSchema } from 'src/turnos/schema/turnos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HistoriaClinica.name,
        schema: HistoriaSchema
      },
      {
        name: Turnos.name,
        schema: turnoSchema
      }
    ])
  ],
  controllers: [HistorialController],
  providers: [HistorialService]
})
export class HistorialModule {}
