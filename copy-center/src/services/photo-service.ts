import { Injectable } from '@nestjs/common';
import { PhotoService } from '../interfaces/photo-service.interface';

@Injectable()
export class RealPhotoService implements PhotoService {
  async takePhoto(): Promise<string> {
    console.log('📸 Taking photo...');
    // Simulate photo taking process
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return a mock base64 encoded photo
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
    // Simulate some proxy logic
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.realService.takePhoto();
  }
} 