import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllCitiesSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List cities' }),
    ApiResponse({ status: 200, description: 'Paginated list of cities' }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'no token provided' } },
            },
          },
        },
      },
    }),
  );
}
