import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a unit category' }),
    ApiResponse({ status: 204, description: 'Unit category deleted' }),
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
