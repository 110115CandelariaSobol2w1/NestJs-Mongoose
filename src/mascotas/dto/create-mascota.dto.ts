import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId, isValidObjectId } from 'mongoose';

export class CreateMascotaDto {

  @IsNotEmpty()
  @IsString()
  nombre_mascota: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  id_cliente: string

}
