import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindAllUnitCategories } from '../dtos/find-all.dto';

export function FindAllUnitCategoriesSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List unit categories' }),
    ApiQuery({ type: FindAllUnitCategories }),
    ApiResponse({ status: 200, description: 'Paginated list of unit categories' }),
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
