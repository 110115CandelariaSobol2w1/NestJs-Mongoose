import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, userSchema } from './Schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { adminCliStrategy} from './jwt/admin-cli.strategy';
import { psicologoAdminStrategy } from './jwt/admin-psico.strategy';
import { MascotasService } from 'src/mascotas/mascotas.service';
import { MascotasModule } from 'src/mascotas/mascotas.module';
import { Mascotas, mascotaSchema } from 'src/mascotas/schema/mascotas.schema';
import { Turnos, turnoSchema } from 'src/turnos/schema/turnos.schema';
import { TurnosModule } from 'src/turnos/turnos.module';

@Module({
  imports: [
    TurnosModule,
    MongooseModule.forFeature([
      {
        name: Usuarios.name,
        schema: userSchema
      },
      {
        name: Mascotas.name,
        schema: mascotaSchema
      },
      {
        name: Turnos.name,
        schema: turnoSchema
      }
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '20h'},
    })
    
  ],
  controllers: [UserController],
  providers: [UserService, adminCliStrategy,psicologoAdminStrategy, MascotasService]
})
export class UserModule {}
