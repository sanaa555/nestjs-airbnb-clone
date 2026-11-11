import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';

export function FindUnitCategoryByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get a unit category by ID' }),
    ApiParam({ name: 'id', description: 'Unit category MongoDB ID', example: '507f1f77bcf86cd799439011' }),
    ApiResponse({ status: 200, type: UnitCategoryResponseDto }),
    ApiResponse({
      status: 400,
      description: 'The unit category ID is not a valid MongoDB ID.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: { errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'paaram must be a valid mongo id' } } } } },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Unit category not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Unit category not found' } } } },
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
