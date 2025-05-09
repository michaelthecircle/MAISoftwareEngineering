import { ApiProperty } from '@nestjs/swagger';
import { DeviceType, RepairStatus } from '../interfaces/repair-request.interface';

export class RepairRequestDto {
  @ApiProperty({
    example: 'req-123',
    description: 'Unique identifier for the repair request'
  })
  id: string;

  @ApiProperty({
    enum: DeviceType,
    example: DeviceType.SMARTPHONE,
    description: 'Type of device to be repaired'
  })
  deviceType: DeviceType;

  @ApiProperty({
    example: 'iPhone 12 Pro',
    description: 'Model of the device'
  })
  deviceModel: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the client'
  })
  clientName: string;

  @ApiProperty({
    example: 'Broken screen and battery not holding charge',
    description: 'Detailed description of the issues'
  })
  description: string;

  @ApiProperty({
    enum: RepairStatus,
    example: RepairStatus.PENDING,
    description: 'Current status of the repair request'
  })
  status: RepairStatus;

  @ApiProperty({
    example: ['screen-123', 'battery-456'],
    description: 'List of component IDs that need repair or replacement',
    type: [String]
  })
  requiredComponents: string[];

  @ApiProperty({
    example: Date.now(),
    description: 'Timestamp when the request was created'
  })
  timestamp: number;

  @ApiProperty({
    example: Date.now() + 86400000,
    description: 'Estimated completion time (optional)',
    required: false
  })
  estimatedCompletionTime?: number;
} 