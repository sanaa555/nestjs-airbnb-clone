import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CreateCountryDto } from '../dtos/create-country.dto';

export function CreateCountrySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a country',
      description: 'Create a country. This endpoint is restricted to system administrators.',
    }),
    ApiBody({ type: CreateCountryDto }),
    ApiResponse({
      status: 201,
      description: 'Country created successfully.',
      type: CountryResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid country data',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'Invalid country data' } },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Missing, invalid, or expired access token.',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: {
                message: { type: 'string', example: 'no token provided' },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'The authenticated account does not have the system-admin role.',
      schema: {
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
                  example: 'you are not allowed to access this resource',
                },
              },
            },
          },
        },
      },
    }),
  );
}
