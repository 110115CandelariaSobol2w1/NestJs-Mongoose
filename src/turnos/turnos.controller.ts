import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { ConsultarTurnoDto } from './dto/consultar-turno.dto';
import { turnosDisponiblesDto } from './dto/disponibles-turno.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  // @Post()
  // create(@Body() createTurnoDto: CreateTurnoDto) {
  //   return this.turnosService.nuevoTurno(createTurnoDto);
  // }

  @UseGuards(AuthGuard('AdminCli'))
  @Post('/prueba')
  crearTurnoPrueba(@Body() turno: CreateTurnoDto) {
    return this.turnosService.nuevoTurno(turno);
  }

  @Get('usuarios/:IdCliente')
  obtenerTurnoMascota(@Param('IdCliente') IdCliente: string) {
    return this.turnosService.obtenerTurnosMascotas(IdCliente);
  }

  //5- Cancelar turno
  @UseGuards()
  @Patch('/cancelar/:id')
  async cancelarCita(@Param('id') id: string) {
    return this.turnosService.cancelarTurno(id);
  }

  //2- ver turnos disponibles
  @UseGuards(AuthGuard('AdminCli'))
  @Get('/disponibles')
  consultarTurnosDisponibles(@Body() turno: turnosDisponiblesDto) {
    return this.turnosService.getHorariosDisponibles(turno);
  }

  //6 - ver info mascota
  @UseGuards(AuthGuard('AdminCli'))
  @Get('/info/:idMascota')
  infoMascota(@Param('idMascota') idMascota: string) {
    return this.turnosService.infoMascotas(idMascota);
  }

  //7- Ver mis turnos psicologo
  @UseGuards(AuthGuard('AdminPsico'))
  @Get('/psicologo')
  consultarTurnos(@Body() turno: ConsultarTurnoDto) {
    return this, this.turnosService.consultarTurnos(turno);
  }

  //8 - Terminar cita y cargar historial
  @UseGuards(AuthGuard('AdminPsico'))
  @Post('/terminar')
  terminarCita(@Body() turno: UpdateTurnoDto) {
    return this.turnosService.terminarCita(turno);
  }

  @Get('/turnos/verPsicologo')
  findAll() {
    return this.turnosService.findAll();
  }
}
