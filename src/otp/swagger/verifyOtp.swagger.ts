


import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';

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

export function VerifyOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Verify an email verification code',
      description:
        'Verify the code sent to an email address. A valid, unexpired code marks that email as verified.',
    }),
    ApiBody({ type: VerifyOtpDto }),
    ApiResponse({
      status: 204,
      description: 'The verification code was accepted and the email is verified.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The request is invalid, the code is invalid or expired, or the email is already verified.',
      schema: errorResponseSchema('Invalid code'),
    }),
  );
}