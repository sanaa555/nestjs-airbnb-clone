


import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

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

export function ResetPasswordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Reset account password',
      description:
        'Set a new password for the supplied email address. A verified password reset code must exist for that email.',
    }),
    ApiBody({ type: ResetPasswordDto }),
    ApiResponse({
      status: 204,
      description: 'The password was reset successfully.',
    }),
    ApiResponse({
      status: 400,
      description:
        'The request is invalid, the email has no verified reset code, or the password reset failed.',
      schema: errorResponseSchema('code not verified'),
    }),
  );
}