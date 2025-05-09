import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ServiceCenterFacadeService } from '../services/service-center-facade.service';
import { RepairRequestDto } from '../dto/repair-request.dto';

@ApiTags('Service Center API')
@Controller('service-center')
export class ServiceCenterController {
  constructor(private readonly serviceCenter: ServiceCenterFacadeService) {}

  @Post('repair-requests')
  @ApiOperation({ 
    summary: 'Submit a new repair request',
    description: 'Creates a new repair request for a device. The request will be processed based on the required components and their availability.'
  })
  @ApiBody({ type: RepairRequestDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Repair request submitted successfully',
    type: RepairRequestDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid request data'
  })
  submitRepairRequest(@Body() request: RepairRequestDto): void {
    this.serviceCenter.submitRepairRequest(request);
  }

  @Post('process')
  @ApiOperation({ 
    summary: 'Process all pending repair requests',
    description: 'Processes all pending repair requests. This includes checking component availability, repairing components, and updating request status.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Repair requests processed successfully'
  })
  processRepairRequests(): void {
    this.serviceCenter.processRepairRequests();
  }

  @Get('status')
  @ApiOperation({ 
    summary: 'Get current system status',
    description: 'Returns the current status of the service center, including active requests, component pool status, and workshop metrics.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns current system status',
    schema: {
      example: {
        activeRequests: 2,
        componentPoolStatus: {
          SCREEN: 5,
          BATTERY: 3,
          CAMERA: 2,
          MOTHERBOARD: 1,
          SPEAKER: 4
        },
        workshopStatus: {
          queueLength: 3,
          successRate: 0.75
        },
        disposedComponents: 1
      }
    }
  })
  getSystemStatus() {
    return this.serviceCenter.getSystemStatus();
  }

  @Get('active-requests')
  @ApiOperation({ 
    summary: 'Get all active repair requests',
    description: 'Returns a list of all repair requests that are not completed.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of active repair requests',
    type: [RepairRequestDto]
  })
  getActiveRequests() {
    return this.serviceCenter.getActiveRequests();
  }

  @Get('disposed-components')
  @ApiOperation({ 
    summary: 'Get all disposed components',
    description: 'Returns a list of all components that have been disposed of due to failed repairs.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of disposed components'
  })
  getDisposedComponents() {
    return this.serviceCenter.getDisposedComponents();
  }
} 