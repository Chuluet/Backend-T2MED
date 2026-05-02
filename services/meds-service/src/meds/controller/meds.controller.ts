import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedsService } from '../application/meds.service';
import { Med } from '../domain/med.entity';
import { InventoryItem } from '../domain/inventory-item.entity';

@Controller()
export class MedsController {
  constructor(private readonly medsService: MedsService) {}

  // ==================== CRUD medicamentos ====================

  @MessagePattern({ cmd: 'create_med' })
  async createMed(@Payload() payload: { userId: string; data: Partial<Med> }) {
    return this.medsService.createMed(payload.userId, payload.data);
  }

  @MessagePattern({ cmd: 'get_meds' })
  async getMeds(@Payload() userId: string) {
    return this.medsService.getMeds(userId);
  }

  @MessagePattern({ cmd: 'update_med' })
  async updateMed(@Payload() payload: { userId: string; medId: string; data: Partial<Med> }) {
    return this.medsService.updateMed(payload.userId, payload.medId, payload.data);
  }

  @MessagePattern({ cmd: 'delete_med' })
  async deleteMed(@Payload() payload: { userId: string; medId: string }) {
    return this.medsService.deleteMed(payload.userId, payload.medId);
  }

  // ==================== Tomas ====================

  @MessagePattern({ cmd: 'registrar_toma' })
  async registrarToma(@Payload() payload: {
    userId: string;
    medId: string;
    nombreMedicamento: string;
    estado: string;
    fechaStr: string;
    horaProgramada: string;
  }) {
    return this.medsService.registrarToma(
      payload.userId,
      payload.medId,
      payload.nombreMedicamento,
      payload.estado,
      payload.fechaStr,
      payload.horaProgramada,
    );
  }

  @MessagePattern({ cmd: 'obtener_toma_del_dia' })
  async obtenerTomaDelDia(@Payload() payload: { userId: string; medId: string; fechaStr: string }) {
    return this.medsService.obtenerTomaDelDia(payload.userId, payload.medId, payload.fechaStr);
  }

  @MessagePattern({ cmd: 'obtener_historial' })
  async obtenerHistorial(@Payload() userId: string) {
    return this.medsService.obtenerHistorial(userId);
  }

  // ==================== Inventario ====================

  @MessagePattern({ cmd: 'create_inventory' })
  async createInventory(@Payload() payload: { userId: string; data: any }) {
    return this.medsService.createInventoryItem(payload.userId, payload.data);
  }

  @MessagePattern({ cmd: 'get_inventory' })
  async getInventory(@Payload() userId: string) {
    return this.medsService.getInventory(userId);
  }

  @MessagePattern({ cmd: 'update_inventory' })
  async updateInventory(@Payload() payload: { userId: string; itemId: string; data: Partial<InventoryItem> }) {
    return this.medsService.updateInventoryItem(payload.userId, payload.itemId, payload.data);
  }

  @MessagePattern({ cmd: 'delete_inventory' })
  async deleteInventory(@Payload() payload: { userId: string; itemId: string }) {
    return this.medsService.deleteInventoryItem(payload.userId, payload.itemId);
  }
}