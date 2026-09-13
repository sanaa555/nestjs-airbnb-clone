import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';

export function CreateUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a unit category' }),
    ApiResponse({ status: 201, type: UnitCategoryResponseDto }),
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
  );
}
