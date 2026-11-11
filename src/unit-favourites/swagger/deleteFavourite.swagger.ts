


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

export function DeleteFavouriteSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Remove a unit from favourites',
      description:
        'Remove the specified unit from the authenticated user’s favourites. Users can only remove their own favourite entries.',
    }),
    ApiParam({
      name: 'unitId',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 204,
      description: 'The unit was removed from the authenticated user’s favourites.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The unit ID is invalid or the unit is not in the authenticated user’s favourites.',
      schema: errorResponseSchema('favourite not found'),
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