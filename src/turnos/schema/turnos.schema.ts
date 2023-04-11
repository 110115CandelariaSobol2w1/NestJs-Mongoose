import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Mascotas } from "src/mascotas/schema/mascotas.schema";
import { Usuarios } from "src/user/Schema/users.schema";


export type mascotaDocument = Turnos & Document;

@Schema()
export class Turnos{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    id_psicologo: Usuarios;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Mascotas" })
    id_mascota: Mascotas
    
    @Prop()
    fecha_inicio: Date

    @Prop()
    fecha_fin: Date

    @Prop()
    estado: string
    
}

export const turnoSchema = SchemaFactory.createForClass(Turnos);