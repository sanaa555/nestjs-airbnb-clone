import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';

export function UpdateCurrencySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a currency',
      description: 'Update a currency. This endpoint is restricted to system administrators.',
    }),
    ApiParam({ name: 'id', description: 'Currency MongoDB ID', example: '507f1f77bcf86cd799439011' }),
    ApiBody({ type: UpdateCurrencyDto }),
    ApiResponse({ status: 200, type: CurrencyResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Invalid currency data or currency ID.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Invalid currency data or currency ID' } } } },
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
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: { errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'no token provided' } } } } },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the system-admin role.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: { errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'you are not allowed to access this resource' } } } } },
      },
    }),
  );
}
