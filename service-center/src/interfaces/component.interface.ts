export enum ComponentType {
  SCREEN = 'SCREEN',
  BATTERY = 'BATTERY',
  CAMERA = 'CAMERA',
  MOTHERBOARD = 'MOTHERBOARD',
  SPEAKER = 'SPEAKER'
}

export enum ComponentStatus {
  NEW = 'NEW',
  USED = 'USED',
  BROKEN = 'BROKEN',
  REPAIRING = 'REPAIRING',
  REPAIRED = 'REPAIRED',
  DISPOSED = 'DISPOSED'
}

export interface Component {
  id: string;
  type: ComponentType;
  status: ComponentStatus;
  model: string;
  serialNumber: string;
  isOriginal: boolean;
  repairHistory: string[];
  clone(): Component;
} 