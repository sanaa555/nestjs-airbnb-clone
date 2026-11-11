


import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SendForgetPassworOtpDto } from '../dtos/send-forget-password-otp.dto';

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

export function SendForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Send a password reset verification code',
      description:
        'Send a six-digit password reset code to the account email. The code is valid for 10 minutes. Requests are limited to 3 per email address every 10 minutes.',
    }),
    ApiBody({ type: SendForgetPassworOtpDto }),
    ApiResponse({
      status: 204,
      description: 'Password reset verification code sent.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The email is missing or invalid, or no account exists for the email address.',
      schema: errorResponseSchema('user not found'),
    }),
    ApiResponse({
      status: 429,
      description:
        'Too many verification code requests. Wait before requesting another code.',
      schema: errorResponseSchema(
        'Too many OTP requests. Please try again later.',
      ),
    }),
  );
}