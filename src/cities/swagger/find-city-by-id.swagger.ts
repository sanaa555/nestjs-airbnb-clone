import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CityResponseDto } from '../dtos/city-response.dto';

export function FindCityByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get a city by ID' }),
    ApiParam({
      name: 'id',
      description: 'City MongoDB ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiResponse({ status: 200, type: CityResponseDto }),
    ApiResponse({
      status: 400,
      description: 'The city ID is not a valid MongoDB ID.',
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
                message: { type: 'string', example: 'param must be a valid mongo id' },
              },
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
              properties: { message: { type: 'string', example: 'no token provided' } },
            },
          },
        },
      },
    }),
  );
}
