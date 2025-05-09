import { Injectable, Logger } from '@nestjs/common';
import { ComponentPoolService } from './component-pool.service';
import { WorkshopService } from './workshop.service';
import { RepairRequest, RepairStatus } from '../interfaces/repair-request.interface';
import { Component, ComponentStatus, ComponentType } from '../interfaces/component.interface';

@Injectable()
export class ServiceCenterFacadeService {
  private readonly logger = new Logger(ServiceCenterFacadeService.name);
  private repairRequests: Map<string, RepairRequest> = new Map();
  private disposedComponents: Component[] = [];

  constructor(
    private readonly componentPool: ComponentPoolService,
    private readonly workshop: WorkshopService
  ) {}

  submitRepairRequest(request: RepairRequest): void {
    this.logger.log(`Submitting repair request for ${request.deviceModel} (ID: ${request.id})`);
    if (!request.requiredComponents) {
      request.requiredComponents = [];
    }
    request.status = RepairStatus.PENDING;
    this.repairRequests.set(request.id, request);
    this.logger.debug(`Request status set to ${request.status}`);
  }

  processRepairRequests(): void {
    this.logger.log('Processing repair requests...');
    let processedCount = 0;
    for (const request of this.repairRequests.values()) {
      if (request.status === RepairStatus.PENDING) {
        this.processRequest(request);
        processedCount++;
      }
    }
    this.logger.log(`Processed ${processedCount} repair requests`);
  }

  private processRequest(request: RepairRequest): void {
    this.logger.debug(`Processing request ${request.id} for ${request.deviceModel}`);
    
    if (!request.requiredComponents || request.requiredComponents.length === 0) {
      this.logger.debug(`No components required for request ${request.id}, marking as completed`);
      request.status = RepairStatus.COMPLETED;
      return;
    }

    request.status = RepairStatus.IN_PROGRESS;
    this.logger.debug(`Request ${request.id} status set to ${request.status}`);
    
    const allComponents = this.componentPool.getAllComponents();
    
    const availableComponents = request.requiredComponents.every(componentId => 
      allComponents.some(comp => comp.id === componentId && comp.status === ComponentStatus.NEW)
    );

    if (!availableComponents) {
      this.logger.debug(`Required components not available for request ${request.id}, waiting for parts`);
      request.status = RepairStatus.WAITING_PARTS;
      return;
    }

    const brokenComponents = allComponents.filter(comp => 
      request.requiredComponents.includes(comp.id) && comp.status === ComponentStatus.BROKEN
    );

    if (brokenComponents.length > 0) {
      this.logger.debug(`Found ${brokenComponents.length} broken components for request ${request.id}`);
      for (const component of brokenComponents) {
        this.workshop.addToRepairQueue(component);
        this.logger.debug(`Added component ${component.id} to repair queue`);
      }
    }

    const repairResults = this.workshop.processRepairQueue();
    
    if (repairResults?.repaired) {
      this.logger.debug(`Repaired ${repairResults.repaired.length} components`);
      for (const component of repairResults.repaired) {
        this.componentPool.addComponent(component);
        this.logger.debug(`Added repaired component ${component.id} back to pool`);
      }
    }

    if (repairResults?.failed) {
      this.logger.debug(`Failed to repair ${repairResults.failed.length} components`);
      for (const component of repairResults.failed) {
        component.status = ComponentStatus.DISPOSED;
        this.disposedComponents.push(component);
        this.logger.debug(`Component ${component.id} marked as disposed`);
      }
    }

    request.status = RepairStatus.COMPLETED;
    this.logger.debug(`Request ${request.id} completed successfully`);
  }

  getSystemStatus() {
    const status = {
      activeRequests: Array.from(this.repairRequests.values())
        .filter(req => req.status !== RepairStatus.COMPLETED)
        .length,
      componentPoolStatus: this.componentPool.getPoolStatus(),
      workshopStatus: {
        queueLength: this.workshop.getRepairQueue().length,
        successRate: this.workshop.getRepairSuccessRate()
      },
      disposedComponents: this.disposedComponents.length
    };
    
    this.logger.debug('Retrieved system status:');
    this.logger.debug(`- Active requests: ${status.activeRequests}`);
    this.logger.debug(`- Disposed components: ${status.disposedComponents}`);
    this.logger.debug(`- Workshop queue length: ${status.workshopStatus.queueLength}`);
    this.logger.debug(`- Workshop success rate: ${status.workshopStatus.successRate}%`);
    
    return status;
  }

  getActiveRequests(): RepairRequest[] {
    const requests = Array.from(this.repairRequests.values())
      .filter(req => req.status !== RepairStatus.COMPLETED);
    this.logger.debug(`Retrieved ${requests.length} active requests`);
    return requests;
  }

  getDisposedComponents(): Component[] {
    const components = [...this.disposedComponents];
    this.logger.debug(`Retrieved ${components.length} disposed components`);
    return components;
  }
} 