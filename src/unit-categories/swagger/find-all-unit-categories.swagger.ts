import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllUnitCategoriesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'List unit categories' }),
    ApiResponse({ status: 200, description: 'Paginated list of unit categories' }),
  );
}
