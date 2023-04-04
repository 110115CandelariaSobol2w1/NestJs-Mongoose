import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, userSchema } from './Schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuarios.name,
        schema: userSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
