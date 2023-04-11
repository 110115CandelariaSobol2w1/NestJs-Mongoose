import { IsNotEmpty } from "class-validator";

export class turnosDisponiblesDto {
  @IsNotEmpty()
  id_psicologo: string;

  @IsNotEmpty()
  id_mascota: string;

  @IsNotEmpty()
  fecha: string;

}
