import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function UpdateCountrySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a country' }),
    ApiResponse({ status: 200, type: CountryResponseDto }),
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
  );
}
