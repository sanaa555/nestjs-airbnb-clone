


import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingRequestDto } from '../dtos/booking-request.dto';
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

export function CreateBookingSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a booking request',
      description:
        'Create a booking request for a unit. The authenticated user becomes the guest; users cannot book their own units.',
    }),
    ApiBody({ type: BookingRequestDto }),
    ApiResponse({
      status: 201,
      description: 'Booking request created successfully.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'Invalid request, booking own unit, invalid date range, insufficient unit capacity, unit not found, or dates overlap an existing booking.',
      schema: errorResponseSchema('Unit is not available for the selected dates'),
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