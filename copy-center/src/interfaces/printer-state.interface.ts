import { PrintRequestDto } from '../dto/print-request.dto';

export interface PrinterState {
  configure(request: PrintRequestDto): void;
  print(request: PrintRequestDto): Promise<void>;
  getStateName(): string;
} 