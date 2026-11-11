


import { applyDecorators } from '@nestjs/common';
import {
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

export function FindAllUnitsSwagger() {
  return applyDecorators(
    ApiExtraModels(UnitResponseDto),
    ApiOperation({
      summary: 'Find all units',
      description:
        'Return active, non-deleted units with optional title, country, and city filters.',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated list of units.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UnitResponseDto) },
          },
          totalCount: { type: 'number', example: 42 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 3 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid country or city MongoDB ID.',
      schema: errorResponseSchema('country must be a mongodb id'),
    }),
  );
}