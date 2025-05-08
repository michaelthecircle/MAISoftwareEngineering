import { Injectable } from '@nestjs/common';
import { PrinterHandler } from '../interfaces/printer-handler.interface';
import { PrintColor } from '../interfaces/print-request.interface';
import { ColorState } from '../states/color-state';
import { PrintRequestDto } from '../dto/print-request.dto';

@Injectable()
export class ColorPrinterHandler implements PrinterHandler {
  private nextHandler: PrinterHandler;
  private state: ColorState;

  constructor() {
    this.state = new ColorState();
  }

  setNext(handler: PrinterHandler): PrinterHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(request: PrintRequestDto): Promise<void> {
    if (request.color === PrintColor.COLOR) {
      console.log('🎨 Color printer handling request...');
      this.state.configure(request);
      await this.state.print(request);
    } else if (this.nextHandler) {
      console.log('➡️  Forwarding request to next handler...');
      await this.nextHandler.handle(request);
    } else {
      throw new Error('❌ No handler available for this request');
    }
  }
} 