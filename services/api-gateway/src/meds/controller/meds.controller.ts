import { Controller, Post, Get, Put, Delete, Body, Param, Inject, Req, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('meds')
@UseGuards(FirebaseAuthGuard)
export class MedsGatewayController {
  constructor(
    @Inject('MEDS_SERVICE') private readonly medsClient: ClientProxy,
  ) {}

  @Post('create')
  createMed(@Req() req, @Body() body: any) {
    return this.medsClient.send({ cmd: 'create_med' }, { userId: req.user.uid, data: body });
  }

  @Get()
  getMeds(@Req() req) {
    return this.medsClient.send({ cmd: 'get_meds' }, req.user.uid);
  }

  @Put(':medId')
  updateMed(@Req() req, @Param('medId') medId: string, @Body() body: any) {
    return this.medsClient.send({ cmd: 'update_med' }, { userId: req.user.uid, medId, data: body });
  }

  @Delete(':medId')
  deleteMed(@Req() req, @Param('medId') medId: string) {
    return this.medsClient.send({ cmd: 'delete_med' }, { userId: req.user.uid, medId });
  }

  @Post(':medId/toma')
  registrarToma(@Req() req, @Param('medId') medId: string, @Body() body: any) {
    return this.medsClient.send({ cmd: 'registrar_toma' }, {
      userId: req.user.uid,
      medId,
      nombreMedicamento: body.nombreMedicamento,
      estado: body.estado,
      fechaStr: body.fecha,
      horaProgramada: body.horaProgramada,
    });
  }

  @Get(':medId/toma')
  obtenerTomaDelDia(@Req() req, @Param('medId') medId: string, @Query('fecha') fecha: string) {
    return this.medsClient.send({ cmd: 'obtener_toma_del_dia' }, { userId: req.user.uid, medId, fechaStr: fecha });
  }

  @Get('historial')
  obtenerHistorial(@Req() req) {
    return this.medsClient.send({ cmd: 'obtener_historial' }, req.user.uid);
  }

  @Post('inventory/create')
  createInventory(@Req() req, @Body() body: any) {
    return this.medsClient.send({ cmd: 'create_inventory' }, { userId: req.user.uid, data: body });
  }

  @Get('inventory')
  getInventory(@Req() req) {
    return this.medsClient.send({ cmd: 'get_inventory' }, req.user.uid);
  }

  @Put('inventory/:itemId')
  updateInventory(@Req() req, @Param('itemId') itemId: string, @Body() body: any) {
    return this.medsClient.send({ cmd: 'update_inventory' }, { userId: req.user.uid, itemId, data: body });
  }

  @Delete('inventory/:itemId')
  deleteInventory(@Req() req, @Param('itemId') itemId: string) {
    return this.medsClient.send({ cmd: 'delete_inventory' }, { userId: req.user.uid, itemId });
  }
}