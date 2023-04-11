import { HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.constants";
import { PassportStrategy } from '@nestjs/passport';
import { query } from "express";

import { MascotasService } from "src/mascotas/mascotas.service";

@Injectable()
export class adminCliStrategy extends PassportStrategy(Strategy, 'AdminCli'){
    constructor(
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false, 
            secretOrKey:jwtConstants.secret,

        });
    }

    async validate(payload:any){
        console.log("IdRol muestro rol " + payload.role)
        console.log("idUsuario " + payload.idUsuario);
        if(payload.role === 'admin' || payload.role === 'cliente'){

            return { IdUsuario: payload.IdUsuario} 
        }

        else{
            throw new HttpException('nooo', 401)
        }

    }

}

