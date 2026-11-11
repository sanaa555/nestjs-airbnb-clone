


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';

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

export function ChangeStatusByHostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Change booking status as its host',
      description:
        'Update the status of a booking owned by the authenticated host. Provide a cancellation reason when setting the status to CANCELLED.',
    }),
    ApiParam({
      name: 'id',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: ChangeBookingStatusDto }),
    ApiResponse({
      status: 200,
      description: 'The booking status was updated.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'The booking ID is invalid, the status is invalid, or the requested status has already been applied.',
      schema: errorResponseSchema('booking already approved'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description:
        'The authenticated account does not have the user role or is not the booking host.',
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