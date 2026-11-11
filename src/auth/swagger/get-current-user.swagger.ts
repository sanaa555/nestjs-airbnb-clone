


import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

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

export function GetCurrentUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get the authenticated account',
      description:
        'Return the account identity and role associated with the current access token.',
    }),
    ApiResponse({
      status: 200,
      description: 'The authenticated account principal.',
      schema: {
        type: 'object',
        required: ['user', 'role'],
        properties: {
          user: {
            type: 'object',
            required: ['_id', 'name', 'email'],
            properties: {
              _id: {
                type: 'string',
                example: '60d21b4967d0d8992e610c85',
              },
              name: { type: 'string', example: 'JOHN DOE' },
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com',
              },
            },
          },
          role: {
            type: 'string',
            enum: ['user', 'system-admin'],
            example: 'user',
          },
        },
        example: {
          user: {
            _id: '60d21b4967d0d8992e610c85',
            name: 'JOHN DOE',
            email: 'john.doe@example.com',
          },
          role: 'user',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: errorResponseSchema('no token provided'),
    }),
  );
}