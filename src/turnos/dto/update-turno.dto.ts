import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoDto } from './create-turno.dto';
import { Turno } from '../entities/turno.entity';
import { IsNotEmpty } from 'class-validator';
import { Mascota } from 'src/mascotas/entities/mascota.entity';

export class UpdateTurnoDto extends PartialType(CreateTurnoDto) {

    @IsNotEmpty()
    id_turno: Turno

    @IsNotEmpty()
    id_mascota: string

    @IsNotEmpty()
    descripcion: string
}
