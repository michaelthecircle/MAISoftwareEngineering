export enum DeviceType {
  SMARTPHONE = 'SMARTPHONE',
  TABLET = 'TABLET',
  SMARTWATCH = 'SMARTWATCH'
}

export enum RepairStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_PARTS = 'WAITING_PARTS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface RepairRequest {
  id: string;
  deviceType: DeviceType;
  deviceModel: string;
  clientName: string;
  description: string;
  status: RepairStatus;
  requiredComponents: string[]; // Component IDs
  timestamp: number;
  estimatedCompletionTime?: number;
} 