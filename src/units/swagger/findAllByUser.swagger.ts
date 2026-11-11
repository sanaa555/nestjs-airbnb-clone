


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

function errorResponseSchema(example: string) {
  return {
    type: 'object',
    required: ['errors'],
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              example,
            },
          },
        },
      },
    },
  };
}

export function FindUserUnitsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiExtraModels(UnitResponseDto),
    ApiOperation({
      summary: 'Find the current user\'s units',
      description:
        'Return the authenticated user\'s non-deleted units. Supports optional title, country, city, and pagination filters.',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated list of the current user\'s units.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UnitResponseDto) },
          },
          totalCount: { type: 'number', example: 12 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid country or city MongoDB ID.',
      schema: errorResponseSchema('country must be a mongodb id'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the user role.',
      schema: errorResponseSchema('you are not allowed to access this resource'),
    }),
  );
}