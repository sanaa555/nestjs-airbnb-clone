


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
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

export function FindByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Find a booking by ID',
      description:
        'Return a booking only when the authenticated user is its guest or host.',
    }),
    ApiParam({
      name: 'id',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 200,
      description: 'The requested booking.',
      type: BookingResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'The booking ID is not a valid MongoDB ID.',
      schema: errorResponseSchema('param must be a valid mongo id'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated user is not the booking guest or host.',
      schema: errorResponseSchema('you are not authorized to access this booking'),
    }),
    ApiResponse({
      status: 404,
      description: 'No booking exists with the supplied ID.',
      schema: errorResponseSchema('Booking not found'),
    }),
  );
}