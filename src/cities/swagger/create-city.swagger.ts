import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CityResponseDto } from '../dtos/city-response.dto';
import { CreateCityDto } from '../dtos/create-city.dto';

export function CreateCitySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a city',
      description: 'Create a city. This endpoint is restricted to system administrators.',
    }),
    ApiBody({ type: CreateCityDto }),
    ApiResponse({
      status: 201,
      description: 'City created successfully.',
      type: CityResponseDto,
    }),
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
