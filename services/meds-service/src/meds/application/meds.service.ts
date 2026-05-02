import { Injectable } from '@nestjs/common';
import { MedRepository } from '../infrastructure/persistence/meds.repository';
import { Med } from '../domain/med.entity';
import { Toma } from '../domain/toma.entity';
import { InventoryItem } from '../domain/inventory-item.entity';

@Injectable()
export class MedsService {
  constructor(private readonly medRepository: MedRepository) {}

  // ==================== CRUD medicamentos ====================

  async createMed(userId: string, data: Partial<Med>): Promise<{ id: string; message: string }> {
    const id = await this.medRepository.create(userId, data);
    return { id, message: 'Medicamento creado correctamente' };
  }

  async getMeds(userId: string): Promise<Med[]> {
    return this.medRepository.findAll(userId);
  }

  async updateMed(userId: string, medId: string, data: Partial<Med>): Promise<{ message: string }> {
    await this.medRepository.update(userId, medId, data);
    return { message: 'Medicamento actualizado correctamente' };
  }

  async deleteMed(userId: string, medId: string): Promise<{ message: string }> {
    await this.medRepository.delete(userId, medId);
    return { message: 'Medicamento eliminado correctamente' };
  }

  // ==================== Tomas ====================

  async registrarToma(
    userId: string,
    medId: string,
    nombreMedicamento: string,
    estado: string,
    fechaStr: string,
    horaProgramada: string,
  ): Promise<{ message: string }> {
    await this.medRepository.registrarToma(userId, {
      medicamentoId: medId,
      nombreMedicamento,
      estado,
      fechaStr,
      horaProgramada,
    });
    await this.medRepository.decrementInventory(userId, medId);
    return { message: 'Toma registrada correctamente' };
  }

  async obtenerTomaDelDia(userId: string, medId: string, fechaStr: string): Promise<Toma | null> {
    return this.medRepository.obtenerTomaDelDia(userId, medId, fechaStr);
  }

  async obtenerHistorial(userId: string): Promise<Toma[]> {
    return this.medRepository.obtenerHistorial(userId);
  }

  // ==================== Inventario ====================

  async createInventoryItem(userId: string, data: any): Promise<{ message: string }> {
    const { medId, ...rest } = data;
    await this.medRepository.createInventoryItem(userId, medId, rest);
    return { message: 'Inventario creado correctamente' };
  }

  async getInventory(userId: string): Promise<InventoryItem[]> {
    return this.medRepository.getInventory(userId);
  }

  async updateInventoryItem(
    userId: string,
    itemId: string,
    data: Partial<InventoryItem>,
  ): Promise<{ message: string; lowStock?: boolean; nombre?: string; cantidad?: number }> {
    const item = await this.medRepository.getInventoryItem(userId, itemId);
    if (!item) throw new Error('Item no encontrado');

    await this.medRepository.updateInventoryItem(userId, itemId, data);

    const nuevaCantidad = data.cantidad !== undefined ? data.cantidad : item.cantidad;
    const lowStock = nuevaCantidad <= item.limiteBajo;

    return {
      message: 'Inventario actualizado correctamente',
      lowStock,
      nombre: item.nombre,
      cantidad: nuevaCantidad,
    };
  }

  async deleteInventoryItem(userId: string, itemId: string): Promise<{ message: string }> {
    await this.medRepository.deleteInventoryItem(userId, itemId);
    return { message: 'Item eliminado del inventario' };
  }
}