import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';
import { UpsertAppSettingDto } from '../dtos/upsert-app-settings.dto';

export function UpsertAppSettingsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create or update application settings',
      description: 'Create or update application settings. This endpoint is restricted to system administrators.',
    }),
    ApiBody({ type: UpsertAppSettingDto }),
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
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the system-admin role.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: {
                message: {
                  type: 'string',
                  example: 'you are not allowed to access this resource',
                },
              },
            },
          },
        },
      },
    }),
  );
}
