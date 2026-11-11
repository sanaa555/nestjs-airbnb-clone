


import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UpdateUnitDto } from '../dtos/update-unit.dto ';

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

export function UpdateUnitSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a unit',
      description: 'Update the specified unit. Only its owner can update it.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: UpdateUnitDto }),
    ApiResponse({
      status: 200,
      description: 'Unit updated successfully.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'Invalid unit ID or update data, or the unit does not exist. Validation messages include cost per day below the configured minimum, city or country not found, country changed without a city, and city-country mismatch.',
      schema: errorResponseSchema('this unit not found'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the unit owner is allowed to update it.',
      schema: errorResponseSchema('you are not allowed.only unit owner can do that'),
    }),
  );
}