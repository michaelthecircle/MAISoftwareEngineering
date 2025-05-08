import { PrintRequestDto } from '../dto/print-request.dto';
import { PrintType, PrintColor, DocumentFormat } from '../interfaces/print-request.interface';

export const testRequests: PrintRequestDto[] = [
  {
    id: 'doc-1',
    type: PrintType.DOCUMENT,
    color: PrintColor.BLACK_AND_WHITE,
    format: DocumentFormat.A4,
    timestamp: Date.now()
  },
  {
    id: 'photo-1',
    type: PrintType.PHOTO,
    color: PrintColor.COLOR,
    format: DocumentFormat.PHOTO_4X6,
    hasPhoto: true,
    photoData: 'base64_encoded_photo_1',
    timestamp: Date.now()
  },
  {
    id: 'photo-2',
    type: PrintType.PHOTO,
    color: PrintColor.COLOR,
    format: DocumentFormat.PHOTO_5X7,
    hasPhoto: false,
    timestamp: Date.now()
  },
  {
    id: 'doc-2',
    type: PrintType.DOCUMENT,
    color: PrintColor.COLOR,
    format: DocumentFormat.A4,
    timestamp: Date.now()
  }
]; 