import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Mascotas } from "src/mascotas/schema/mascotas.schema";

export type userDocument = Usuarios & Document;

@Schema()
export class Usuarios{
    @Prop()
    username: string;

    @Prop()
    password: string

    @Prop()
    rol: string
    
}

export const userSchema = SchemaFactory.createForClass(Usuarios);