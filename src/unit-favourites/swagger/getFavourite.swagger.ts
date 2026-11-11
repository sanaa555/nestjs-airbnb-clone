


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindUnitFavouriteDto } from '../dtos/find-unit-favourite.dto';
import { UnitFavouriteResponseDto } from '../dtos/unit-favourite-response.dto';

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

export function GetFavouriteSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiExtraModels(UnitFavouriteResponseDto),
    ApiOperation({
      summary: 'Get my favourite units',
      description:
        'Return active, non-deleted units favourited by the authenticated user, with pagination. Users can only retrieve their own favourites.',
    }),
    ApiQuery({ type: FindUnitFavouriteDto }),
    ApiResponse({
      status: 200,
      description: 'Paginated favourite units belonging to the authenticated user.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UnitFavouriteResponseDto) },
          },
          totalCount: { type: 'number', example: 8 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the user role.',
      schema: errorResponseSchema(
        'you are not allowed to access this resource',
      ),
    }),
  );
}