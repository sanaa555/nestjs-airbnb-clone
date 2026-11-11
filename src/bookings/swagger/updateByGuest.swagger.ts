


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { UpdateBookingRequestDto } from '../dtos/update-booking-request.dto';

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

export function UpdateByGuestSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a booking as its guest',
      description:
        'Update the authenticated guest’s booking. To change dates, provide both checkIn and checkOut; the new date range must be valid and available. Updated guest counts must fit the unit capacity.',
    }),
    ApiParam({
      name: 'id',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: UpdateBookingRequestDto }),
    ApiResponse({
      status: 200,
      description: 'The booking was updated.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'The booking ID is invalid, only one date was supplied, the date range is invalid or unavailable, or a guest count exceeds unit capacity.',
      schema: errorResponseSchema(
        'Unit is not available for the selected dates',
      ),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated user is not the booking guest.',
      schema: errorResponseSchema(
        'you are not authorized to update this booking',
      ),
    }),
    ApiResponse({
      status: 404,
      description: 'No booking exists with the supplied ID.',
      schema: errorResponseSchema('booking not found'),
    }),
  );
}