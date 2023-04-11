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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuarios.name,
        schema: userSchema
      }
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '20h'},
    }),
  ],
  controllers: [UserController],
  providers: [UserService, adminCliStrategy,psicologoAdminStrategy]
})
export class UserModule {}
