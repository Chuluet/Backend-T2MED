import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './appointments/infrastructure/firebase.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [FirebaseModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}