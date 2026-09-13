import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';

export function UpsertAppSettingsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create or update application settings' }),
    ApiResponse({ status: 200, type: AppSettingsResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Invalid application settings',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Invalid application settings' } } } },
        },
      },
    }),
  );
}
