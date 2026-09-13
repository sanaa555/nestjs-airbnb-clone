import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

export function CreateCurrencySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a currency' }),
    ApiResponse({ status: 201, type: CurrencyResponseDto }),
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
  );
}
