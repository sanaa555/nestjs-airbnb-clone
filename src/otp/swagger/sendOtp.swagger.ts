


import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SendOtpDto } from '../dtos/send-otp.dto';

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

export function SendOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Send an email verification code',
      description:
        'Generate and email a six-digit verification code to the supplied address. A code is valid for 10 minutes. An already-verified email cannot request another code.',
    }),
    ApiBody({ type: SendOtpDto }),
    ApiResponse({
      status: 204,
      description: 'Verification code sent successfully.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The email is missing or invalid, or the email address is already verified.',
      schema: errorResponseSchema('email already verified'),
    }),
  );
}