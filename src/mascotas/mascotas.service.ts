import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascotas, mascotaDocument } from './schema/mascotas.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Mascota } from './entities/mascota.entity';
import { Model} from 'mongoose';
import { ObjectId } from 'mongoose';
import { Usuarios, userDocument } from 'src/user/Schema/users.schema';

@Injectable()
export class MascotasService {
  constructor(
    @InjectModel(Mascotas.name) private mascotaModule: Model<mascotaDocument>,
    //@InjectModel(Usuarios.name) private userModule: Model<userDocument>,
  ) {}

  //1- Ver psicologos: User module
  //3- Registrar turno: Turno module
  //5- Cancelar turno: Turno module 
  //7- Ver mis citas: Turno module



  //creamos una mascota
  async create(newMascota: CreateMascotaDto) {
    const newPet = new this.mascotaModule(newMascota);
    return newPet.save();
  }

  //obtenemos mascotas por id de cliente
  async findAllByUser(userId: string): Promise<Mascotas[]> {
    return this.mascotaModule
      .find({ id_cliente: userId })
      .populate('id_cliente')
      .exec();
  }

  //obtener los turnos de la mascota
  async obtenerTurnosMascotas(IdCliente: string): Promise<Mascotas[]> {
    return await this.mascotaModule.find({
      id_cliente: IdCliente,
      'turnos.IdEstado': 'activo',
    })
    .populate({
      path: 'turnos',
      populate: {
        path: 'id_usuario',
        select: 'id username',
      },
    });
  }

  async findAll(): Promise<Mascotas[]> {
    return await this.mascotaModule.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
