import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

export function UpdateCurrencySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a currency' }),
    ApiResponse({ status: 200, type: CurrencyResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Invalid currency data',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Invalid currency data' } } } },
        },
      },
    }),
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
