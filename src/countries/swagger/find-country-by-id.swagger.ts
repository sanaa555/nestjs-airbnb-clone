import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function FindCountryByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a country by ID' }),
    ApiResponse({ status: 200, type: CountryResponseDto }),
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
