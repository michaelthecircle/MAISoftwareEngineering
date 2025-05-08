import { ApiProperty } from '@nestjs/swagger';
import { PrintType, PrintColor, DocumentFormat } from '../interfaces/print-request.interface';

export class PrintRequestDto {
  @ApiProperty({
    description: 'Unique identifier for the print request',
    example: 'doc-1'
  })
  id: string;

  @ApiProperty({
    description: 'Type of the print request',
    enum: PrintType,
    example: PrintType.DOCUMENT
  })
  type: PrintType;

  @ApiProperty({
    description: 'Color mode for printing',
    enum: PrintColor,
    example: PrintColor.BLACK_AND_WHITE
  })
  color: PrintColor;

  @ApiProperty({
    description: 'Format of the document',
    enum: DocumentFormat,
    example: DocumentFormat.A4
  })
  format: DocumentFormat;

  @ApiProperty({
    description: 'Whether the photo is already available',
    required: false,
    example: true
  })
  hasPhoto?: boolean;

  @ApiProperty({
    description: 'Base64 encoded photo data',
    required: false,
    example: 'base64_encoded_photo'
  })
  photoData?: string;

  @ApiProperty({
    description: 'Timestamp of the request',
    example: 1234567890
  })
  timestamp: number;
} 