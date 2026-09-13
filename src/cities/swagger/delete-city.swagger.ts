import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteCitySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a city' }),
    ApiResponse({ status: 204, description: 'City deleted' }),
    ApiResponse({
      status: 404,
      description: 'City not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'City not found' } },
            },
          },
        },
      },
    }),
  );
}
