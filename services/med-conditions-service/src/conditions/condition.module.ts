import { Module } from '@nestjs/common';
import { ConditionController } from './controller/condition.controller';
import { ConditionService } from './application/condition.service';
import { ConditionRepository } from './infrastructure/persistence/condition.repository';

@Module({
  controllers: [ConditionController],
  providers: [ConditionService, ConditionRepository],
  exports: [ConditionService],
})
export class ConditionModule {}