import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindAllCurriencies } from '../dtos/find-all.dto';

export function FindAllCurrenciesSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List currencies' }),
    ApiQuery({ type: FindAllCurriencies }),
    ApiResponse({ status: 200, description: 'Paginated list of currencies' }),
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
