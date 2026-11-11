


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CancelBookingByGuestDto } from '../dtos/cancel-booking-by-guest.dto';

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

export function CancelByGuestSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Cancel a booking as its guest',
      description:
        'Cancel a booking owned by the authenticated guest. A booking cannot be cancelled if it is already cancelled or completed. A cancellation reason may be provided.',
    }),
    ApiParam({
      name: 'id',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: CancelBookingByGuestDto }),
    ApiResponse({
      status: 200,
      description: 'The booking was cancelled.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'The booking ID is invalid, or the booking has already been cancelled or completed.',
      schema: errorResponseSchema('Booking can not be cancelled'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description:
        'The authenticated account does not have the user role or is not the booking guest.',
      schema: errorResponseSchema(
        'you are not authorized to update this booking',
      ),
    }),
    ApiResponse({
      status: 404,
      description: 'No booking exists with the supplied ID.',
      schema: errorResponseSchema('Booking not found'),
    }),
  );
}