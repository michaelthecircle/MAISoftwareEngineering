import { PrintRequestDto } from '../dto/print-request.dto';

export interface PrinterHandler {
  setNext(handler: PrinterHandler): PrinterHandler;
  handle(request: PrintRequestDto): Promise<void>;
} 