import { HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { jwtConstants } from "./jwt.constants";

@Injectable()
export class psicologoAdminStrategy extends PassportStrategy(Strategy, 'AdminPsico'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false, 
            secretOrKey:jwtConstants.secret
        });
    }

    async validate(payload:any){
        console.log("IdRol muestro rol" + payload.role)
        if(payload.role === 'admin' || payload.role === 'psicologo'){

            return { IdUsuario: payload.IdUsuario} 
        }

        else{
            throw new HttpException('nooo', 401)
        }
    }

}