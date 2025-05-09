import { Module, OnModuleInit } from '@nestjs/common';
import { ServiceCenterController } from './controllers/service-center.controller';
import { ServiceCenterFacadeService } from './services/service-center-facade.service';
import { ComponentPoolService } from './services/component-pool.service';
import { WorkshopService } from './services/workshop.service';
import { TestDataService } from './services/test-data.service';

@Module({
  imports: [],
  controllers: [ServiceCenterController],
  providers: [
    ServiceCenterFacadeService,
    ComponentPoolService,
    WorkshopService,
    TestDataService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly testDataService: TestDataService) {}

  onModuleInit() {
    this.testDataService.initializeTestData();
  }
} 