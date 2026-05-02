import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './meds/infrastructure/firebase.module';
import { MedsModule } from './meds/meds.module';

@Module({
  imports: [FirebaseModule, MedsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}