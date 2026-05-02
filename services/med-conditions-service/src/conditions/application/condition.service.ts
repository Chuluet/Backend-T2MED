import { Injectable } from '@nestjs/common';
import { ConditionRepository } from '../infrastructure/persistence/condition.repository';
import { Condition } from '../domain/condition.entity';

@Injectable()
export class ConditionService {
  constructor(private readonly conditionRepository: ConditionRepository) {}

  async saveMedicalProfile(userId: string, data: Partial<Condition>): Promise<{ message: string }> {
    await this.conditionRepository.save(userId, data);
    return { message: 'Perfil médico actualizado correctamente' };
  }

  async getMedicalProfile(userId: string): Promise<Condition | {}> {
    const profile = await this.conditionRepository.findByUserId(userId);
    return profile ?? {};
  }
}