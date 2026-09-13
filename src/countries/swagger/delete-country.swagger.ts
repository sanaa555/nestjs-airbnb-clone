import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteCountrySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a country' }),
    ApiResponse({ status: 204, description: 'Country deleted' }),
    ApiResponse({
      status: 404,
      description: 'Country not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'Country not found' } },
            },
          },
        },
      },
    }),
  );
}
