


import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UnitReviews } from '../dtos/unit-reviews.dto';

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

export function FindUnitReviewsSwagger() {
  return applyDecorators(
    ApiExtraModels(UnitReviews),
    ApiOperation({
      summary: 'Find reviews for a unit',
      description:
        'Return paginated reviews for the specified unit. The unit ID is used to filter reviews.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated reviews for the unit.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UnitReviews) },
          },
          totalCount: { type: 'number', example: 8 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'The unit ID is not a valid MongoDB ID.',
      schema: errorResponseSchema('param must be a valid mongo id'),
    }),
  );
}