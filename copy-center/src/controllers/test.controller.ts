import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CopyCenterService } from '../services/copy-center.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly copyCenterService: CopyCenterService) {}

  @Post('print-requests')
  @ApiOperation({ summary: 'Process all test print requests' })
  @ApiResponse({
    status: 200,
    description: 'All test requests have been successfully processed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'All test requests processed successfully'
        }
      }
    }
  })
  async processTestRequests(): Promise<{ message: string }> {
    await this.copyCenterService.processTestRequests();
    return { message: 'All test requests processed successfully' };
  }
} 