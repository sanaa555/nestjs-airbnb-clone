


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';

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

export function DeleteUnitPhotosSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete unit photos',
      description:
        'Remove the specified photo URLs from the unit and delete those files. Only the unit owner can do this.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: DeleteUnitPhotosDto }),
    ApiNoContentResponse({ description: 'Photos deleted successfully.' }),
    ApiResponse({
      status: 400,
      description:
        'The unit ID is invalid, the unit does not exist, or the photos array is missing or empty.',
      schema: errorResponseSchema('No Photo Provided'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the unit owner is allowed to delete its photos.',
      schema: errorResponseSchema('you are not allowed.only unit owner can do that'),
    }),
  );
}