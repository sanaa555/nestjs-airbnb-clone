


import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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

export function FindUnitByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find a unit by ID',
      description: 'Return an active, non-deleted unit by its MongoDB ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 200,
      description: 'Unit found successfully.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'The ID is invalid or no active, non-deleted unit exists for it.',
      schema: errorResponseSchema('unit with id 64a1f2e3b4c5d6e7f8a9b0c1 not exist'),
    }),
  );
}