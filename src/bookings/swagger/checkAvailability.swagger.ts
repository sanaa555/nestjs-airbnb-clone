


import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';

function errorResponseSchema(example: string) {
  return {
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
              example,
            },
          },
        },
      },
    },
  };
}

export function CheckAvailabilitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Check unit availability',
      description:
        'Publicly check a unit for date conflicts and calculate the stay amount, including VAT.',
    }),
    ApiResponse({
      status: 200,
      description: 'The unit is available for the requested dates with calculated pricing.',
      type: AvailabilityResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'Invalid request, unsupported guest capacity, unavailable dates, or unit not found.',
      schema: errorResponseSchema('Unit is not available for the selected dates'),
    }),
  );
}