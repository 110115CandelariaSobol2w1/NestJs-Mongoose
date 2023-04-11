import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Turnos } from './schema/turnos.schema';
import { TurnosModule } from './turnos.module';
import { Model, ObjectId, model } from 'mongoose';
import { Mode } from 'fs';
import { HistoriaClinica } from 'src/historial/schema/historia.schema';
import { HistorialModule } from 'src/historial/historial.module';
import { ConsultarTurnoDto } from './dto/consultar-turno.dto';
import { turnosDisponiblesDto } from './dto/disponibles-turno.dto';
import { MascotasModule } from 'src/mascotas/mascotas.module';
import { Mascotas } from 'src/mascotas/schema/mascotas.schema';
import { identity } from 'rxjs';
import moment from 'moment';

@Injectable()
export class TurnosService {
  constructor(
    @InjectModel(Turnos.name) private turnoModule: Model<TurnosModule>,
    @InjectModel(HistoriaClinica.name)
    private historiaModule: Model<HistorialModule>,
    @InjectModel(Mascotas.name) private mascotaModule: Model<MascotasModule>,
  ) {}

  //2- Ver turnos disponibles LISTO
  async getHorariosDisponibles(turnosDisponibles: turnosDisponiblesDto) {
    const findMascota = await this.mascotaModule
      .findOne({ _id: turnosDisponibles.id_mascota })
      .lean();

    const tipo = findMascota['tipo'];
    console.log(tipo);
    const duracion = tipo === 'gato' ? 45 : 30;
    const fechaString = turnosDisponibles.fecha;
    const fechaSplit = fechaString.split('/');
    const fechaDate = new Date(
      `${fechaSplit[2]}/${fechaSplit[1]}/${fechaSplit[0]}`,
    );

    const fechaInicio = new Date(fechaDate);
    fechaInicio.setHours(9, 0, 0, 0);
    const fechaFin = new Date(fechaDate);
    fechaFin.setHours(18, 0, 0, 0);

    const turnos = await this.turnoModule.find({
      fecha_inicio: fechaInicio,
      id_Psicologo: turnosDisponibles.id_psicologo,
    });

    const horariosDisponibles = [];
    let hora = fechaInicio;
    while (hora <= fechaFin) {
      const horaFin = new Date(hora.getTime() + duracion * 60000);
      const disponible = await this.turnoModule.countDocuments({
        $or: [
          {
            fecha_inicio: { $lte: horaFin },
            fecha_fin: { $gte: hora },
          },
          {
            fecha_inicio: { $lt: hora },
            fecha_fin: { $gt: horaFin },
          },
        ],
      });

      console.log('DISPONIBILIDAD ' + ' ' + disponible);

      if (disponible === 0) {
        horariosDisponibles.push(new Date(hora));
      }

      hora = new Date(hora.getTime() + 15 * 60000);
    }

    return horariosDisponibles;
  }

  //3 - registar un nuevo turno LISTO
  async nuevoTurno(createTurnoDto: CreateTurnoDto) {
    //Primero obtenemos el tipo de la mascota
    const findMascota = await this.mascotaModule
      .findOne({ _id: createTurnoDto.id_mascota })
      .lean();
    console.log(findMascota['tipo']);
    const tipo = findMascota['tipo'];

    //segundo verificamos que la mascota no tenga un turno dado
    const count = await this.turnoModule.countDocuments({
      id_mascota: createTurnoDto.id_mascota,
      estado: 'activo',
    });
    console.log('control ' + count);

    //si la mascota no tiene un turno dado verificamos la disponibilidad

    if (tipo === 'perro' && count == 0) {
      const Fecha_inicio = new Date(createTurnoDto.fecha_inicio);
      const nuevaFechaFin = new Date(Fecha_inicio.getTime() + 30 * 60000);
      createTurnoDto.fecha_Fin = nuevaFechaFin;
      console.log('verificando disponibilidad');

      const verificacion = await this.turnoModule.countDocuments({
        fecha_inicio: { $lte: createTurnoDto.fecha_Fin },
        fecha_fin: { $gt: createTurnoDto.fecha_inicio },
      });

      const verificacionLugar = verificacion;
      const idEstado = 'activo';

      if (verificacionLugar === 0) {
        console.log('hay lugar en las fechas seleccionadas');

        const turno = new this.turnoModule({
          id_psicologo: createTurnoDto.id_psicologo,
          id_mascota: createTurnoDto.id_mascota,
          fecha_inicio: createTurnoDto.fecha_inicio,
          fecha_fin: nuevaFechaFin,
          estado: idEstado,
        });
        console.log('hasta aca llega');
        await turno.save();

        return 'registrando turno';
      } else {
        return 'No hay lugar en las fechas solicitadas';
      }
    } /////////GATOS
    else if (tipo === 'gato' && count == 0) {
      const Fecha_inicio = new Date(createTurnoDto.fecha_inicio);
      const nuevaFechaFin = new Date(Fecha_inicio.getTime() + 30 * 60000);
      createTurnoDto.fecha_Fin = nuevaFechaFin;
      console.log('verificando disponibilidad');

      const verificacion = await this.turnoModule.countDocuments({
        fecha_inicio: { $lte: createTurnoDto.fecha_Fin },
        fecha_fin: { $gt: createTurnoDto.fecha_inicio },
      });

      const verificacionLugar = verificacion;
      const idEstado = 'activo';

      if (verificacionLugar === 0) {
        console.log('hay lugar en las fechas seleccionadas');

        const turno = new this.turnoModule({
          id_psicologo: createTurnoDto.id_psicologo,
          id_mascota: createTurnoDto.id_mascota,
          fecha_inicio: createTurnoDto.fecha_inicio,
          fecha_fin: nuevaFechaFin,
          estado: idEstado,
        });
        console.log('hasta aca llega');
        await turno.save();

        return 'registrando turno';
      } else {
        return 'No hay lugar en las fechas solicitadas';
      }
    } else if (count == 1) {
      return 'La mascota ya tiene un turno activo registrado';
    }
  }

  //4- Ver mis turnos (Id cliente) LISTO
  async obtenerTurnosMascotas(IdCliente: string) {
    return this.turnoModule.find().populate({
      path: 'id_mascota',
      model: 'Mascotas',
      select: 'nombre_mascota',
      match: { id_cliente: IdCliente },
      populate: {
        path: 'id_cliente',
        model: 'Usuarios',
        select: 'username',
      },
    });
  }

  //5 - cancelar un turno LISTO
  async cancelarTurno(id: string) {
    await this.turnoModule.findOneAndUpdate(
      { _id: id },
      { estado: 'Cancelado' },
    );
  }

  //6- Ver informacion de la mascota con sus turnos e historial
  async infoMascotas(idMascota:string){
    console.log(idMascota);
    return await this.historiaModule.findOne({id_mascota: idMascota})
    .populate({
      path:'id_turno',
      model: 'Turno',
      select: 'id_psicologo, fecha_inicio'
    })
    .populate({
      path: 'id_mascota',
      model: 'Mascotas',
      select: 'nombre_mascota tipo'
    })

  }

  //7- ver mis citas psicologo LISTO
  async consultarTurnos(turno: ConsultarTurnoDto) {
    const id_psicologo = turno.id_psicologo;
    console.log(id_psicologo);
    const fecha = turno.fecha;
    console.log(fecha);

    const fechaInicio = new Date(fecha); // obtiene la fecha al comienzo del día
    const fechaFin = new Date(fechaInicio.getTime() + 24 * 60 * 60 * 1000); // obtiene la fecha al final del día

    return await this.turnoModule
      .find({
        id_psicologo: id_psicologo,
        fecha_inicio: {
          $gte: fechaInicio,
          $lte: fechaFin
        },
      })
      .populate({
        path: 'id_mascota',
        model: 'Mascotas',
        select: 'nombre_mascota',
      });
  }

  //8 - finalizar turno y cargar historial LISTO
  async terminarCita(turno: UpdateTurnoDto) {
    const IdEstado = 'terminado';
    const id_turno = turno.id_turno;

    await this.turnoModule.updateOne(
      { _id: id_turno },
      { $set: { estado: IdEstado } },
    );

    console.log("hasta aca llega");
    const fecha = new Date();
    const descripcion = turno.descripcion;

    const historial = new this.historiaModule({
      id_turno: id_turno,
      id_mascota: turno.id_mascota,
      fecha: fecha,
      descripcion: descripcion,
    });
    console.log("hasta aca llega2");

    await historial.save();
    console.log("hasta aca llega3");
    console.log(historial)
  }

  //obtener todos los turnos
  async findAll(): Promise<Turnos[]> {
    return await this.turnoModule.find();
  }
}
