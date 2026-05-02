import { Module } from '@nestjs/common';
import { MedsController } from './controller/meds.controller';
import { MedsService } from './application/meds.service';
import { MedRepository } from './infrastructure/persistence/meds.repository';

@Module({
  controllers: [MedsController],
  providers: [MedsService, MedRepository],
  exports: [MedsService],
})
export class MedsModule {}