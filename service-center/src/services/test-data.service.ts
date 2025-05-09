import { Injectable, Logger } from '@nestjs/common';
import { ComponentPoolService } from './component-pool.service';
import { ServiceCenterFacadeService } from './service-center-facade.service';
import { ComponentType, ComponentStatus } from '../interfaces/component.interface';
import { RepairRequest, RepairStatus, DeviceType } from '../interfaces/repair-request.interface';
import { SmartphoneComponentFactory } from '../factories/component-factory';

@Injectable()
export class TestDataService {
  private readonly logger = new Logger(TestDataService.name);
  private componentIds: Map<ComponentType, string[]> = new Map();
  private factory: SmartphoneComponentFactory;

  constructor(
    private readonly componentPoolService: ComponentPoolService,
    private readonly serviceCenter: ServiceCenterFacadeService,
  ) {
    this.factory = SmartphoneComponentFactory.getInstance();
  }

  initializeTestData() {
    this.logger.log('Initializing test data...');
    this.initializeComponentPool();
    this.initializeRepairRequests();
    this.logger.log('Test data initialization completed');
  }

  private initializeComponentPool() {
    this.logger.log('Initializing component pool...');
    const models = ['iPhone 12', 'Samsung S21', 'Google Pixel 6'];
    const types = Object.values(ComponentType);

    types.forEach(type => {
      this.componentIds.set(type, []);
    });

    types.forEach(type => {
      models.forEach(model => {
        for (let i = 0; i < 2; i++) {
          const component = this.factory.createComponent(type, model);
          this.componentPoolService.addComponent(component);
          this.componentIds.get(type)?.push(component.id);
          this.logger.debug(`Created component: ${component.type} for ${component.model} (ID: ${component.id})`);
        }
      });
    });

    const poolStatus = this.componentPoolService.getPoolStatus();
    this.logger.log('Component pool status:');
    poolStatus.forEach((count, type) => {
      this.logger.log(`- ${type}: ${count} components`);
    });
  }

  private initializeRepairRequests() {
    this.logger.log('Initializing repair requests...');
    const testRequests: RepairRequest[] = [
      {
        id: '1',
        deviceType: DeviceType.SMARTPHONE,
        deviceModel: 'iPhone 12',
        clientName: 'John Aboba',
        description: 'screen issues',
        status: RepairStatus.PENDING,
        requiredComponents: [this.componentIds.get(ComponentType.SCREEN)?.[0] || ''],
        timestamp: Date.now(),
        estimatedCompletionTime: Date.now() + 86400000
      },
      {
        id: '2',
        deviceType: DeviceType.TABLET,
        deviceModel: 'iPad Pro',
        clientName: 'Jane Smith',
        description: 'Not charging',
        status: RepairStatus.PENDING,
        requiredComponents: [this.componentIds.get(ComponentType.BATTERY)?.[0] || ''],
        timestamp: Date.now(),
        estimatedCompletionTime: Date.now() + 43200000
      },
      {
        id: '3',
        deviceType: DeviceType.SMARTPHONE,
        deviceModel: 'Samsung S21',
        clientName: 'Denis Aboba',
        description: 'Broken camera',
        status: RepairStatus.PENDING,
        requiredComponents: [this.componentIds.get(ComponentType.CAMERA)?.[0] || ''],
        timestamp: Date.now(),
        estimatedCompletionTime: Date.now() + 86400000
      },
      {
        id: '4',
        deviceType: DeviceType.SMARTPHONE,
        deviceModel: 'Google Pixel 6',
        clientName: 'Alice Brown',
        description: 'Water damage',
        status: RepairStatus.PENDING,
        requiredComponents: [this.componentIds.get(ComponentType.MOTHERBOARD)?.[0] || ''],
        timestamp: Date.now(),
        estimatedCompletionTime: Date.now() + 172800000
      },
      {
        id: '5',
        deviceType: DeviceType.SMARTPHONE,
        deviceModel: 'iPhone 12',
        clientName: 'Charlie Gorschenko',
        description: 'Broken speaker',
        status: RepairStatus.PENDING,
        requiredComponents: [this.componentIds.get(ComponentType.SPEAKER)?.[0] || ''],
        timestamp: Date.now(),
        estimatedCompletionTime: Date.now() + 43200000
      }
    ];

    testRequests.forEach(request => {
      this.serviceCenter.submitRepairRequest(request);
      this.logger.debug(`Created repair request for ${request.deviceModel} (ID: ${request.id})`);
    });
    this.logger.log(`Created ${testRequests.length} repair requests`);
  }
} 