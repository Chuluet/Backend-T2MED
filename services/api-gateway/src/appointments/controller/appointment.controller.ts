import { Controller, Post, Get, Put, Delete, Body, Param, Inject, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('appointments')
@UseGuards(FirebaseAuthGuard)
export class AppointmentsGatewayController {
  constructor(
    @Inject('APPOINTMENTS_SERVICE') private readonly appointmentsClient: ClientProxy,
  ) {}

  @Post('create')
  createAppointment(@Req() req, @Body() body: any) {
    return this.appointmentsClient.send({ cmd: 'create_appointment' }, { userId: req.user.uid, data: body });
  }

  @Get()
  getAppointments(@Req() req) {
    return this.appointmentsClient.send({ cmd: 'get_appointments' }, req.user.uid);
  }

  @Put(':appointmentId')
  updateAppointment(@Req() req, @Param('appointmentId') appointmentId: string, @Body() body: any) {
    return this.appointmentsClient.send({ cmd: 'update_appointment' }, { userId: req.user.uid, appointmentId, data: body });
  }

  @Delete(':appointmentId')
  deleteAppointment(@Req() req, @Param('appointmentId') appointmentId: string) {
    return this.appointmentsClient.send({ cmd: 'delete_appointment' }, { userId: req.user.uid, appointmentId });
  }
}