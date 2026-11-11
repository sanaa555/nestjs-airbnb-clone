import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

export function FindCurrencyByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get a currency by ID' }),
    ApiParam({ name: 'id', description: 'Currency MongoDB ID', example: '507f1f77bcf86cd799439011' }),
    ApiResponse({ status: 200, type: CurrencyResponseDto }),
    ApiResponse({
      status: 400,
      description: 'The currency ID is not a valid MongoDB ID.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: { errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'paaram must be a valid mongo id' } } } } },
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
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: { errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'no token provided' } } } } },
      },
    }),
  );
}
