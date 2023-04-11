import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Turno } from 'src/turnos/entities/turno.entity';
import { Usuarios } from 'src/user/Schema/users.schema';

export type mascotaDocument = Mascotas & Document;

@Schema()
export class Mascotas {
  @Prop()
  nombre_mascota: string;

  @Prop({ type: String })
  tipo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' })
  id_cliente: Usuarios;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turno' }] })
  turnos: Turno[];
}

export const mascotaSchema = SchemaFactory.createForClass(Mascotas);
