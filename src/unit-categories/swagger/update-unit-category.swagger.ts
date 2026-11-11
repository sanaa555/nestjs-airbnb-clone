import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';

export function UpdateUnitCategorySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a unit category',
      description: 'Update a unit category. This endpoint is restricted to system administrators.',
    }),
    ApiParam({ name: 'id', description: 'Unit category MongoDB ID', example: '507f1f77bcf86cd799439011' }),
    ApiBody({ type: UpdateUnitCategoryDto }),
    ApiResponse({ status: 200, type: UnitCategoryResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Invalid unit category data',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { type: 'object', required: ['message'], properties: { message: { type: 'string', example: 'Invalid unit category data' } } } },
        },
      },
    }),
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
