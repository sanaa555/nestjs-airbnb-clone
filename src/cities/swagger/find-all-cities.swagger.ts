import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllCitiesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'List cities' }),
    ApiResponse({ status: 200, description: 'Paginated list of cities' }),
  );
}
