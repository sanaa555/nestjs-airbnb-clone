import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteCurrencySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a currency' }),
    ApiResponse({ status: 204, description: 'Currency deleted' }),
    ApiResponse({
      status: 404,
      description: 'Currency not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Currency not found' } } } },
        },
      },
    }),
  );
}
