import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';

export function CreateCurrencySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a currency',
      description: 'Create a currency. This endpoint is restricted to system administrators.',
    }),
    ApiBody({ type: CreateCurrencyDto }),
    ApiResponse({ status: 201, description: 'Currency created successfully.', type: CurrencyResponseDto }),
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
