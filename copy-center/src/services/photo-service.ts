import { Injectable } from '@nestjs/common';
import { PhotoService } from '../interfaces/photo-service.interface';

@Injectable()
export class RealPhotoService implements PhotoService {
  async takePhoto(): Promise<string> {
    console.log('📸 Taking photo...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'mock_photo_data_base64';
  }
}

@Injectable()
export class PhotoServiceProxy implements PhotoService {
  private realService: RealPhotoService;

  constructor() {
    this.realService = new RealPhotoService();
  }

  async takePhoto(): Promise<string> {
    console.log('🔍 Proxy: Checking if photo service is available...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.realService.takePhoto();
  }
} 