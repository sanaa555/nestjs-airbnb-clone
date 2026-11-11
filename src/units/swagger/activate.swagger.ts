


import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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

export function ActivateUnitSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate a unit',
      description: 'Activate the specified unit. Only its owner can do this.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 200,
      description: 'Unit activated successfully.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'The ID is invalid, the unit does not exist, or it is already activated.',
      schema: errorResponseSchema('unit is already activated'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the unit owner is allowed to activate it.',
      schema: errorResponseSchema('you are not allowed.only unit owner can do that'),
    }),
  );
}