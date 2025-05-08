export enum PrintType {
  PHOTO = 'PHOTO',
  DOCUMENT = 'DOCUMENT'
}

export enum PrintColor {
  BLACK_AND_WHITE = 'BLACK_AND_WHITE',
  COLOR = 'COLOR'
}

export enum DocumentFormat {
  A4 = 'A4',
  PHOTO_4X6 = 'PHOTO_4X6',
  PHOTO_5X7 = 'PHOTO_5X7'
}

export interface PrintRequest {
  id: string;
  type: PrintType;
  color: PrintColor;
  format: DocumentFormat;
  hasPhoto?: boolean;
  photoData?: string; // Base64 encoded photo data
  timestamp: number;
} 