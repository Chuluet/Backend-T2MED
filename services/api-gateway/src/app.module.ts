import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserGatewayController } from './users/controller/user.controller';
import { AppointmentsGatewayController } from './appointments/controller/appointment.controller';
import { MedsGatewayController } from './meds/controller/meds.controller';
import { ConditionsGatewayController } from './conditions/controller/conditions.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT) || 3001,
        },
      },
      {
        name: 'APPOINTMENTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.APPOINTMENTS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.APPOINTMENTS_SERVICE_PORT) || 3002,
        },
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.NOTIFICATIONS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.NOTIFICATIONS_SERVICE_PORT) || 3003,
        },
      },
      {
        name: 'MEDS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MEDS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.MEDS_SERVICE_PORT) || 3004,
        },
      },
      {
        name: 'CONDITIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CONDITIONS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.CONDITIONS_SERVICE_PORT) || 3005,
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    UserGatewayController,
    AppointmentsGatewayController,
    MedsGatewayController,
    ConditionsGatewayController,
  ],
  providers: [AppService],
})
export class AppModule {}