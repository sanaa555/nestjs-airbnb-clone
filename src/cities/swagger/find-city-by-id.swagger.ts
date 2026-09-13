import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dtos/city-response.dto';

export function FindCityByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a city by ID' }),
    ApiResponse({ status: 200, type: CityResponseDto }),
    ApiResponse({
      status: 404,
      description: 'City not found',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'City not found' } },
            },
          },
        },
      },
    }),
  );
}
