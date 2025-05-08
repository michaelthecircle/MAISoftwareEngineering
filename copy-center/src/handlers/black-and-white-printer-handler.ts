import { Injectable } from '@nestjs/common';
import { PrinterHandler } from '../interfaces/printer-handler.interface';
import { PrintColor } from '../interfaces/print-request.interface';
import { BlackAndWhiteState } from '../states/black-and-white-state';
import { PrintRequestDto } from '../dto/print-request.dto';

@Injectable()
export class BlackAndWhitePrinterHandler implements PrinterHandler {
  private nextHandler: PrinterHandler;
  private state: BlackAndWhiteState;

  constructor() {
    this.state = new BlackAndWhiteState();
  }

  setNext(handler: PrinterHandler): PrinterHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(request: PrintRequestDto): Promise<void> {
    if (request.color === PrintColor.BLACK_AND_WHITE) {
      console.log('⚫ Black and white printer handling request...');
      this.state.configure(request);
      await this.state.print(request);
    } else if (this.nextHandler) {
      console.log('➡️  Forwarding request to next handler...');
      await this.nextHandler.handle(request);
    } else {
      throw new Error('❌ No handler available for color printing');
    }
  }
} 