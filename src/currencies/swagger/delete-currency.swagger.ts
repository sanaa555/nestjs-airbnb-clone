import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteCurrencySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete a currency',
      description: 'Delete a currency. This endpoint is restricted to system administrators.',
    }),
    ApiParam({ name: 'id', description: 'Currency MongoDB ID', example: '507f1f77bcf86cd799439011' }),
    ApiResponse({ status: 204, description: 'Currency deleted' }),
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
