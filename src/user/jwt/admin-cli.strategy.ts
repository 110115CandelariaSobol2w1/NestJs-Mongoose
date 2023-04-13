import { HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.constants";
import { PassportStrategy } from '@nestjs/passport';
import { query } from "express";

import { MascotasService } from "src/mascotas/mascotas.service";

@Injectable()
export class adminCliStrategy extends PassportStrategy(Strategy, 'AdminCli'){
    constructor(
        private mascotaService: MascotasService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false, 
            secretOrKey:jwtConstants.secret,
            passReqToCallback: true,

        });
    }

    async validate(req:Request,payload: any) {
        console.log('IdRol muestro rol' + payload.role);
        console.log(payload.id);
        console.log(req.body);
        let idMascota;

        if ('id_mascota' in req.body) {
          idMascota = req.body.id_mascota;
          // hacer algo con idMascota
        } else {
          console.log("error");
        }
        
        console.log(req.body);
        
        if (idMascota) {
          const query = await this.mascotaService.getPetById(idMascota);
          console.log(query.id_cliente);
          if (payload.role === 'admin' || payload.role === 'cliente' && query.id_cliente === payload.id) {
          
            return { IdUsuario: payload.IdUsuario };
          }
      
          throw new HttpException('No es tu mascota, no tenes permiso', 401);
        }
  
        }
        
        
    
       
}

