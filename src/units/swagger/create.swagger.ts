


import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

export function CreateUnitSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a unit',
      description:
        'Create a unit and return the created unit. Requires a valid user access token.',
    }),
    ApiResponse({
      status: 201,
      description: 'Unit created successfully.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'Validation error. Possible messages include: cost per day can not be less than the configured minimum, city not found, country not found, city doesnot belong to the selected country, or unitCategory not found.',
      schema: errorResponseSchema('city not found'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have permission.',
      schema: errorResponseSchema('you are not allowed to access this resource'),
    }),
  );
}