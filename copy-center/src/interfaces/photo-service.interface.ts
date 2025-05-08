export interface PhotoService {
  takePhoto(): Promise<string>; // Returns base64 encoded photo
} 