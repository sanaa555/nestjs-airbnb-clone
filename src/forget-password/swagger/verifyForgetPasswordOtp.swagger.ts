


import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { VerifyForgetPassworOtpDto } from '../dtos/verify-forget-password-otp.dto';

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

export function VerifyForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Verify a password reset code',
      description:
        'Verify the code sent to the account email. A valid, unexpired code that has not already been verified marks the password reset request as verified.',
    }),
    ApiBody({ type: VerifyForgetPassworOtpDto }),
    ApiResponse({
      status: 204,
      description: 'The password reset verification code was accepted.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The request is invalid, the email or code is incorrect, the code has expired, or it was already verified.',
      schema: errorResponseSchema('Invalid code'),
    }),
  );
}