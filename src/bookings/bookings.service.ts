import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUsecase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUsecase:CheckAvailabilityUsecase
    ){}

    async checkAvailability(query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
          return this.checkAvailabilityUsecase.excute(query)
    }
}
