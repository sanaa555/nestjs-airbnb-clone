


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

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

export function AddFavouriteSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Add a unit to favourites',
      description:
        'Add the specified unit to the authenticated user’s favourites. Users cannot favourite their own units. Adding a unit that is already a favourite succeeds without creating a duplicate.',
    }),
    ApiParam({
      name: 'unitId',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 204,
      description: 'The unit was added to favourites, or was already a favourite.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The unit ID is invalid, the unit does not exist, or the authenticated user owns the unit.',
      schema: errorResponseSchema(
        'you can not add your units to your favourites list',
      ),
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