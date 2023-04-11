import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { ObjectId } from 'mongoose';
import { Mascotas } from './schema/mascotas.schema';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get('/:userId')
  async findAllByUser(@Param('userId') userId: string): Promise<Mascotas[]> {
    return this.mascotasService.findAllByUser(userId);
  }

  @Get('usuarios/:IdCliente')
  obtenerTurnoMascota(@Param('IdCliente') IdCliente: string) {
    return this.mascotasService.obtenerTurnosMascotas(IdCliente);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mascotasService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(+id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}
