


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';

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

export function FindMineSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiExtraModels(BookingResponseDto),
    ApiOperation({
      summary: 'Find my bookings',
      description:
        'Return the authenticated user\'s bookings. Use userType to filter as host or guest; omit it to include both roles.',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated bookings belonging to the authenticated user.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(BookingResponseDto) },
          },
          totalCount: { type: 'number', example: 12 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 1 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description:
        'Check the filter values. Use a valid status, asc or desc for sorting, and host or guest for userType.',
      schema: errorResponseSchema('userType must be host or guest.'),
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