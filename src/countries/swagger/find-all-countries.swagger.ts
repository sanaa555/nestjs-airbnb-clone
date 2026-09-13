import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllCountriesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'List countries' }),
    ApiResponse({ status: 200, description: 'Paginated list of countries' }),
  );
}
