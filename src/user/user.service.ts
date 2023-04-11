import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuarios, userDocument } from './Schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.tdo';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Usuarios.name) private userModule: Model<userDocument>,
    private jwtService: JwtService,
  ) {}

  async create(userObject: CreateUserDto) {
    const { password } = userObject;
    const plainToHash = await argon2.hash(password);
    const hexPassword = plainToHash;
    userObject = { ...userObject, password: hexPassword };

    return this.userModule.create(userObject);
  }

 
  async login(userObjectLogin: LoginUserDto) {
    const { username, password } = userObjectLogin;
    const findUser = await this.userModule.findOne({ username });

    if (!findUser) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const validatePassword = await argon2.verify(findUser.password, password);

    if (!validatePassword) {
      throw new HttpException('PASSWORD INCORRECT', HttpStatus.FORBIDDEN);
    }

    const payload = {
      id: findUser.id,
      name: findUser.username,
      role: findUser.rol,
    };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    console.log(payload);
    return data;
  }

  //1- obtener psicologos 
  async obtenerPsicologos(): Promise<Usuarios[]> {
    // Utiliza el modelo de Mongoose para realizar la consulta
    return this.userModule.find({ rol: 'psicologo' }).select('username _id').exec();
  }

  


  async findAll(): Promise<Usuarios[]> {
    return await this.userModule.find().exec();
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
