import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Mascotas, mascotaSchema } from './schema/mascotas.schema';
import { UserModule } from 'src/user/user.module';
import { Turno } from 'src/turnos/entities/turno.entity';
import { turnoSchema } from 'src/turnos/schema/turnos.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Mascotas.name,
        schema: mascotaSchema
      },
      {
        name: Turno.name,
        schema: turnoSchema
      }
    ]), UserModule
  ],
  controllers: [MascotasController],
  providers: [MascotasService]
})
export class MascotasModule {}
