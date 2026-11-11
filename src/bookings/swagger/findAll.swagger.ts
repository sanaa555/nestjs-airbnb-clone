


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

export function FindAllSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiExtraModels(BookingResponseDto),
    ApiOperation({
      summary: 'Find all bookings',
      description:
        'Admin-only paginated booking search. Supports unit, status, check-in, and check-out filters. Sorting defaults to descending by creation date and total amount.',
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated bookings matching the supplied filters.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(BookingResponseDto) },
          },
          totalCount: { type: 'number', example: 42 },
          page: { type: 'number', nullable: true, example: 1 },
          limit: { type: 'number', nullable: true, example: 20 },
          pageCount: { type: 'number', example: 3 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description:
        'Check the filter values. Status: PENDING, CONFIRMED, DECLINED, CANCELLED, or COMPLETED. Sort: asc or desc.',
      schema: errorResponseSchema(
        'Invalid filter value. Check the status or sort value.',
      ),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the system-admin role.',
      schema: errorResponseSchema('you are not allowed to access this resource'),
    }),
  );
}