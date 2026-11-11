import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';

export function UpdateCountrySwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update a country',
      description: 'Update a country. This endpoint is restricted to system administrators.',
    }),
    ApiParam({
      name: 'id',
      description: 'Country MongoDB ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiBody({ type: UpdateCountryDto }),
    ApiResponse({
      status: 200,
      description: 'Country updated successfully.',
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
