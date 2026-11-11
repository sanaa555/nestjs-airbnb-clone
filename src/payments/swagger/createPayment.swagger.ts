


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { PaymentResponseDto } from '../dtos/payment-response.dto';

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

export function CreatePaymentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a payment checkout session',
      description:
        'Create a Stripe Checkout session for a confirmed booking. Only the authenticated guest who made the booking can initiate payment.',
    }),
    ApiParam({
      name: 'bookingId',
      description: 'Booking MongoDB ID',
      example: '64a1f2e3b4c5d6e7f8a9b0c1',
    }),
    ApiResponse({
      status: 201,
      description: 'Payment created with a Stripe Checkout URL.',
      type: PaymentResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'The booking ID is invalid, the booking is not confirmed, or a checkout URL could not be created.',
      schema: errorResponseSchema('Booking must be confirmed before payment'),
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
    ApiResponse({
      status: 403,
      description: 'Only the guest who made the booking can initiate payment.',
      schema: errorResponseSchema('Only the guest can pay for this booking'),
    }),
    ApiResponse({
      status: 404,
      description: 'No booking exists with the supplied ID.',
      schema: errorResponseSchema('Booking not found'),
    }),
  );
}