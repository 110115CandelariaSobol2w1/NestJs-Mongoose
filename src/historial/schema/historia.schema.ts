import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { Mascotas } from "src/mascotas/schema/mascotas.schema";
import { Turno } from "src/turnos/entities/turno.entity";

export type HistoriaDocument = HistoriaClinica & Document

@Schema()
export class HistoriaClinica{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Turno" })
    id_turno: Turno

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Mascotas" })
    id_mascota: Mascotas
    
    @Prop()
    fecha: Date

    @Prop()
    descripcion: string


}

export const HistoriaSchema = SchemaFactory.createForClass(HistoriaClinica)