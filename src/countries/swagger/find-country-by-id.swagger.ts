import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function FindCountryByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get a country by ID' }),
    ApiParam({
      name: 'id',
      description: 'Country MongoDB ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiResponse({ status: 200, type: CountryResponseDto }),
    ApiResponse({
      status: 400,
      description: 'The country ID is not a valid MongoDB ID.',
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
                  example: 'param mmust be a valid mongo id',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Country not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'Country not found' } },
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
  );
}
