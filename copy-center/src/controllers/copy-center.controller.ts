import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CopyCenterService } from '../services/copy-center.service';
import { PrintRequestDto } from '../dto/print-request.dto';

@ApiTags('copy-center')
@Controller('copy-center')
export class CopyCenterController {
  constructor(private readonly copyCenterService: CopyCenterService) {}

  @Post('print')
  @ApiOperation({ summary: 'Process a print request' })
  @ApiResponse({
    status: 200,
    description: 'The print request has been successfully processed',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Print request processed successfully'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters'
  })
  async processPrintRequest(@Body() request: PrintRequestDto): Promise<{ message: string }> {
    await this.copyCenterService.processPrintRequest(request);
    return { message: 'Print request processed successfully' };
  }
} 