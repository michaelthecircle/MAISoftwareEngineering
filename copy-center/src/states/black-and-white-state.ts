import { Injectable } from '@nestjs/common';
import { PrinterState } from '../interfaces/printer-state.interface';
import { PrintRequestDto } from '../dto/print-request.dto';

@Injectable()
export class BlackAndWhiteState implements PrinterState {
  configure(request: PrintRequestDto): void {
    console.log('⚙️  Configuring printer for black and white printing...');
    // Simulate printer configuration
  }

  async print(request: PrintRequestDto): Promise<void> {
    console.log('🖨️  Printing in black and white...');
    // Simulate printing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Black and white printing completed');
  }

  getStateName(): string {
    return 'Black and White';
  }
} 