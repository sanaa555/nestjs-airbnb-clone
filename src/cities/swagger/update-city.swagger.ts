import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CityResponseDto } from '../dtos/city-response.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';

export function UpdateCitySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a city',
      description: 'Update a city. This endpoint is restricted to system administrators.',
    }),
    ApiParam({
      name: 'id',
      description: 'City MongoDB ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiBody({ type: UpdateCityDto }),
    ApiResponse({
      status: 200,
      description: 'City updated successfully.',
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
