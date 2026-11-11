import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

export function PaymentSuccessSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Confirm payment checkout return',
      description:
        'Stripe redirects to this endpoint after checkout. The endpoint returns the supplied session ID; it does not verify payment status.',
    }),
    ApiQuery({
      name: 'session_id',
      description: 'Stripe Checkout Session ID provided by the redirect.',
      required: true,
      example: 'cs_test_123456789',
    }),
    ApiResponse({
      status: 200,
      description: 'Checkout return information.',
      schema: {
        type: 'object',
        required: ['message', 'sessionId'],
        properties: {
          message: { type: 'string', example: 'Payment completed successfully' },
          sessionId: { type: 'string', example: 'cs_test_123456789' },
        },
      },
    }),
  );
}
