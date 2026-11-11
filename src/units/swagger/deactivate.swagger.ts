


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

export function DeActivateUnitSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate a unit',
      description: 'Deactivate the specified unit. Only its owner can do this.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 200,
      description: 'Unit deactivated successfully.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'The ID is invalid, the unit does not exist, or it is already deactivated.',
      schema: errorResponseSchema('unit is already deactivated'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the unit owner is allowed to deactivate it.',
      schema: errorResponseSchema('you are not allowed.only unit owner can do that'),
    }),
  );
}