import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConditionService } from '../application/condition.service';
import { Condition } from '../domain/condition.entity';

@Controller()
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @MessagePattern({ cmd: 'save_medical_profile' })
  async saveMedicalProfile(@Payload() payload: { userId: string; data: Partial<Condition> }) {
    return this.conditionService.saveMedicalProfile(payload.userId, payload.data);
  }

  @MessagePattern({ cmd: 'get_medical_profile' })
  async getMedicalProfile(@Payload() userId: string) {
    return this.conditionService.getMedicalProfile(userId);
  }
}