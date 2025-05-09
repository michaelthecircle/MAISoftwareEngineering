import { Injectable } from '@nestjs/common';
import { Component, ComponentStatus } from '../interfaces/component.interface';

interface RepairResult {
  repaired: Component[];
  failed: Component[];
}

@Injectable()
export class WorkshopService {
  private repairQueue: Component[] = [];
  private repairHistory: Map<string, boolean> = new Map();

  addToRepairQueue(component: Component) {
    component.status = ComponentStatus.REPAIRING;
    this.repairQueue.push(component);
  }

  processRepairQueue(): RepairResult {
    const repairedComponents: Component[] = [];
    const failedComponents: Component[] = [];

    for (const component of this.repairQueue) {
      const repairSuccess = Math.random() < 0.7;
      
      if (repairSuccess) {
        component.status = ComponentStatus.REPAIRED;
        component.repairHistory.push(
          `[${new Date().toISOString()}] Repair completed successfully`
        );
        repairedComponents.push(component);
      } else {
        component.status = ComponentStatus.BROKEN;
        component.repairHistory.push(
          `[${new Date().toISOString()}] Repair failed - component beyond repair`
        );
        failedComponents.push(component);
      }

      this.repairHistory.set(component.id, repairSuccess);
    }

    this.repairQueue = [];

    return {
      repaired: repairedComponents,
      failed: failedComponents
    };
  }

  getRepairQueue(): Component[] {
    return [...this.repairQueue];
  }

  getRepairHistory(): Map<string, boolean> {
    return new Map(this.repairHistory);
  }

  getRepairSuccessRate(): number {
    if (this.repairHistory.size === 0) return 0;
    
    const successfulRepairs = Array.from(this.repairHistory.values())
      .filter(success => success).length;
    
    return successfulRepairs / this.repairHistory.size;
  }
} 