import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';

export function CreateUnitCategorySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a unit category',
      description: 'Create a unit category. This endpoint is restricted to system administrators.',
    }),
    ApiBody({ type: CreateUnitCategoryDto }),
    ApiResponse({ status: 201, description: 'Unit category created successfully.', type: UnitCategoryResponseDto }),
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
