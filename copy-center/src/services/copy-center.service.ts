import { Injectable } from '@nestjs/common';
import { PrintType } from '../interfaces/print-request.interface';
import { BlackAndWhitePrinterHandler } from '../handlers/black-and-white-printer-handler';
import { ColorPrinterHandler } from '../handlers/color-printer-handler';
import { PhotoServiceProxy } from './photo-service';
import { PrintRequestDto } from '../dto/print-request.dto';

@Injectable()
export class CopyCenterService {
  private blackAndWhiteHandler: BlackAndWhitePrinterHandler;
  private colorHandler: ColorPrinterHandler;
  private photoService: PhotoServiceProxy;

  constructor() {
    this.blackAndWhiteHandler = new BlackAndWhitePrinterHandler();
    this.colorHandler = new ColorPrinterHandler();
    this.photoService = new PhotoServiceProxy();

    // Set up the chain of responsibility
    this.blackAndWhiteHandler.setNext(this.colorHandler);
  }

  async processPrintRequest(request: PrintRequestDto): Promise<void> {
    console.log('\n📝 ===========================================');
    console.log(`📋 Processing print request ${request.id}`);
    console.log('📝 ===========================================');
    console.log(`📄 Type: ${request.type}`);
    console.log(`🎨 Color: ${request.color}`);
    console.log(`📏 Format: ${request.format}`);

    if (request.type === PrintType.PHOTO && !request.hasPhoto) {
      console.log('\n📸 No photo provided, taking a new photo...');
      request.photoData = await this.photoService.takePhoto();
      request.hasPhoto = true;
    }

    await this.blackAndWhiteHandler.handle(request);
    console.log('\n✅ Print request completed successfully');
    console.log('📝 ===========================================\n');
  }

  async processTestRequests(): Promise<void> {
    const { testRequests } = await import('../test-data/print-requests');
    console.log('\n🚀 Starting test requests processing...\n');
    
    for (const request of testRequests) {
      await this.processPrintRequest(request);
    }
    
    console.log('🎉 All test requests completed!\n');
  }
} 