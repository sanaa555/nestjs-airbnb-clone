import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dtos/city-response.dto';

export function UpdateCitySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a city' }),
    ApiResponse({ status: 200, type: CityResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Invalid city data',
      schema: {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['message'],
              properties: { message: { type: 'string', example: 'Invalid city data' } },
            },
          },
        },
      },
    }),
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
