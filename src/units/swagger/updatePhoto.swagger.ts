


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UpdateUnitPhotosDto } from '../dtos/update-unit-photos.dto ';

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

export function UpdateUnitPhotosSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiOperation({
      summary: 'Add photos to a unit',
      description:
        'Upload up to 5 JPG or PNG files (maximum 2 MB each). Only the unit owner can upload photos; duplicate image content is ignored.',
    }),
    ApiParam({
      name: 'id',
      description: 'Unit MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: UpdateUnitPhotosDto }),
    ApiResponse({
      status: 200,
      description: 'Unit returned with its updated photo list.',
      type: UnitResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'The unit ID is invalid or the unit does not exist.',
      schema: errorResponseSchema('this unit not found'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the unit owner is allowed to upload photos.',
      schema: errorResponseSchema('you are not allowed.only unit owner can do that'),
    }),
    ApiResponse({
      status: 415,
      description: 'A photo is required; files must be JPG or PNG and no larger than 2 MB.',
      schema: errorResponseSchema('Validation failed (current file type is not allowed)'),
    }),
  );
}