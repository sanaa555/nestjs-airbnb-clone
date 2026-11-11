import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';

export function FindAppSettingsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
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
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'no token provided' } },
            },
          },
        },
      },
    }),
  );
}
