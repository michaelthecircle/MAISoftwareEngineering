import { Injectable } from '@nestjs/common';
import { PrinterState } from '../interfaces/printer-state.interface';
import { PrintRequestDto } from '../dto/print-request.dto';

@Injectable()
export class ColorState implements PrinterState {
  configure(request: PrintRequestDto): void {
    console.log('⚙️  Configuring printer for color printing...');
  }

  async print(request: PrintRequestDto): Promise<void> {
    console.log('🖨️  Printing in color...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('✅ Color printing completed');
  }

  getStateName(): string {
    return 'Color';
  }
} 