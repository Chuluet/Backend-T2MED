import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './users/infrastructure/firebase.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [FirebaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}