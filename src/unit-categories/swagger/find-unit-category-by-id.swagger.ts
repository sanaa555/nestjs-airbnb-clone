import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';

export function FindUnitCategoryByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a unit category by ID' }),
    ApiResponse({ status: 200, type: UnitCategoryResponseDto }),
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
  );
}
