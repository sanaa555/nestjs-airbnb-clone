import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function CreateCountrySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a country' }),
    ApiResponse({ status: 201, type: CountryResponseDto }),
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
  );
}
