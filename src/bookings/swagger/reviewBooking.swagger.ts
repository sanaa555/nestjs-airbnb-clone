


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { GuestReviewDto } from '../dtos/guest-review.dto';

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

export function ReviewBookingSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Submit a review for a completed booking',
      description:
        'Submit a rating and optional comment for a completed booking. Only the booking guest may submit a review, and each booking can be reviewed once.',
    }),
    ApiParam({
      name: 'id',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiBody({ type: GuestReviewDto }),
    ApiResponse({
      status: 200,
      description: 'The booking review was submitted.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'The booking ID or review is invalid, the booking is not completed, the booking already has a review, or saving the review failed.',
      schema: errorResponseSchema(
        'Booking is not completed,you can not submit a review',
      ),
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