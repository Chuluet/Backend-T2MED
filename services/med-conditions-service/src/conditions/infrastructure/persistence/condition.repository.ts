import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Condition } from '../../domain/condition.entity';

@Injectable()
export class ConditionRepository {
  private db = admin.firestore();

  async save(userId: string, data: Partial<Condition>): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('medicalProfile')
      .doc('profile')
      .set(
        {
          ...data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
  }

  async findByUserId(userId: string): Promise<Condition | null> {
    const doc = await this.db
      .collection('users')
      .doc(userId)
      .collection('medicalProfile')
      .doc('profile')
      .get();
    if (!doc.exists) return null;
    return { userId, ...doc.data() } as Condition;
  }
}