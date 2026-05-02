import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './conditions/infrastructure/firebase.module';
import { ConditionModule } from './conditions/condition.module';

@Module({
  imports: [FirebaseModule, ConditionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}