import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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