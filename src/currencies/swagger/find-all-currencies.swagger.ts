import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllCurrenciesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'List currencies' }),
    ApiResponse({ status: 200, description: 'Paginated list of currencies' }),
  );
}
