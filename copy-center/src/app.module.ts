import { Module } from '@nestjs/common';
import { CopyCenterController } from './controllers/copy-center.controller';
import { TestController } from './controllers/test.controller';
import { CopyCenterService } from './services/copy-center.service';
import { BlackAndWhitePrinterHandler } from './handlers/black-and-white-printer-handler';
import { ColorPrinterHandler } from './handlers/color-printer-handler';
import { PhotoServiceProxy } from './services/photo-service';

@Module({
  imports: [],
  controllers: [CopyCenterController, TestController],
  providers: [
    CopyCenterService,
    BlackAndWhitePrinterHandler,
    ColorPrinterHandler,
    PhotoServiceProxy
  ],
})
export class AppModule {} 