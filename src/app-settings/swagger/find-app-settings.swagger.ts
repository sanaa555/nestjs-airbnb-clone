import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';

export function FindAppSettingsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get application settings' }),
    ApiResponse({ status: 200, type: AppSettingsResponseDto }),
    ApiResponse({
      status: 404,
      description: 'Application settings not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Application settings not found' } } } },
        },
      },
    }),
  );
}
