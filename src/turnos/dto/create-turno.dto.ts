import { IsNotEmpty } from "class-validator";

export class CreateTurnoDto {
  //@IsNotEmpty()
  id_psicologo: string;

  @IsNotEmpty()
  id_mascota: string;

  //@IsNotEmpty()
  fecha_inicio: Date;

  fecha_Fin: Date;

  estado: string;
}
