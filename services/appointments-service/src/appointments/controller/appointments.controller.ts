import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from '../application/appointments.service';
import { Appointment } from '../domain/appointment.entity';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern({ cmd: 'create_appointment' })
  async createAppointment(@Payload() payload: { userId: string; data: Partial<Appointment> }) {
    return this.appointmentsService.createAppointment(payload.userId, payload.data);
  }

  @MessagePattern({ cmd: 'get_appointments' })
  async getAppointments(@Payload() userId: string) {
    return this.appointmentsService.getAppointments(userId);
  }

  @MessagePattern({ cmd: 'update_appointment' })
  async updateAppointment(@Payload() payload: { userId: string; appointmentId: string; data: Partial<Appointment> }) {
    return this.appointmentsService.updateAppointment(payload.userId, payload.appointmentId, payload.data);
  }

  @MessagePattern({ cmd: 'delete_appointment' })
  async deleteAppointment(@Payload() payload: { userId: string; appointmentId: string }) {
    return this.appointmentsService.deleteAppointment(payload.userId, payload.appointmentId);
  }
}