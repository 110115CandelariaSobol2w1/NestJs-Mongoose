import { IsNotEmpty } from "class-validator";

export class ConsultarTurnoDto {
  @IsNotEmpty()
  id_psicologo: string;

  @IsNotEmpty()
  fecha: Date;

}
