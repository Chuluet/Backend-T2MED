import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Med } from '../../domain/med.entity';
import { Toma } from '../../domain/toma.entity';
import { InventoryItem } from '../../domain/inventory-item.entity';

@Injectable()
export class MedRepository {
  private db = admin.firestore();

  // ==================== CRUD medicamentos ====================

  async create(userId: string, data: Partial<Med>): Promise<string> {
    const ref = await this.db
      .collection('users')
      .doc(userId)
      .collection('medicamentos')
      .add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    return ref.id;
  }

  async findAll(userId: string): Promise<Med[]> {
    const snapshot = await this.db
      .collection('users')
      .doc(userId)
      .collection('medicamentos')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, userId, ...doc.data() } as Med));
  }

  async update(userId: string, medId: string, data: Partial<Med>): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('medicamentos')
      .doc(medId)
      .update(data);
  }

  async delete(userId: string, medId: string): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('medicamentos')
      .doc(medId)
      .delete();
  }

  // ==================== Tomas ====================

  async registrarToma(userId: string, data: Partial<Toma>): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('tomasHistorial')
      .doc()
      .set({
        ...data,
        fecha: admin.firestore.Timestamp.fromDate(new Date()),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  }

  async obtenerTomaDelDia(userId: string, medId: string, fechaStr: string): Promise<Toma | null> {
    const snapshot = await this.db
      .collection('users')
      .doc(userId)
      .collection('tomasHistorial')
      .where('medicamentoId', '==', medId)
      .where('fechaStr', '==', fechaStr)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Toma;
  }

  async obtenerHistorial(userId: string): Promise<Toma[]> {
    const snapshot = await this.db
      .collection('users')
      .doc(userId)
      .collection('tomasHistorial')
      .orderBy('fecha', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Toma));
  }

  // ==================== Inventario ====================

  async createInventoryItem(userId: string, medId: string, data: Partial<InventoryItem>): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .doc(medId)
      .set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  }

  async getInventory(userId: string): Promise<InventoryItem[]> {
    const snapshot = await this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, userId, ...doc.data() } as InventoryItem));
  }

  async getInventoryItem(userId: string, itemId: string): Promise<InventoryItem | null> {
    const doc = await this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .doc(itemId)
      .get();
    if (!doc.exists) return null;
    return { id: doc.id, userId, ...doc.data() } as InventoryItem;
  }

  async updateInventoryItem(userId: string, itemId: string, data: Partial<InventoryItem>): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .doc(itemId)
      .update(data);
  }

  async decrementInventory(userId: string, medId: string): Promise<void> {
    const ref = this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .doc(medId);
    const doc = await ref.get();
    if (doc.exists) {
      await ref.update({
        cantidad: admin.firestore.FieldValue.increment(-1),
      });
    }
  }

  async deleteInventoryItem(userId: string, itemId: string): Promise<void> {
    await this.db
      .collection('users')
      .doc(userId)
      .collection('inventario')
      .doc(itemId)
      .delete();
  }
}