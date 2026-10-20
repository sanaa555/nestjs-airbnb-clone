import { Injectable } from '@nestjs/common';
import { CreateUnitUsecase } from './usecases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UpdateUnitUsecase } from './usecases/update-unit.usecase';
import { FindAllDto } from './dtos/find-all-units.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllUnitsUsacase } from './usecases/find-all-units.usecase';
import { FindUnitByIdUsecase } from './usecases/find-unit-by-id.usecase';
import { FindAllUnitsByUserUsacase } from './usecases/find-all-units-by-user].usecase copy';
import { DeleteUnitUseCase } from './usecases/soft-delete-unit.usecase';
import { ActivateUnitUseCase } from './usecases/activate-unit.usecase ';
import { DeActivateUnitUseCase } from './usecases/deactivate-unit.usecase ';
import { DeleteUnitPhotoUsecase } from './usecases/delete-unit-photo.usecase';
import { UpdateUnitPhotoUsease } from './usecases/update-unit-photo.usecase';
import { MulterFile } from 'src/files-upload/types/multer-file.type';
import { UpdateUnitAvgRateAndCountUsecase } from './usecases/update-unit-avg-rate-and-count.usecase';
import { UpdateUnitAvgAndCountDto } from './dtos/update-unit-avg-rate-and-count.dto';
import { ClientSession } from 'mongoose';
import { UnitReviews } from './dtos/unit-reviews.dto';
import { PaginationDto } from 'src/common/data-access/dto/pagination.dto';
import { FindUnitReviewsUsecase } from './usecases/find-unit-reviews.usecase';

@Injectable()
export class UnitsService {

    constructor(
        private readonly createUnitUsecase:CreateUnitUsecase,
        private readonly updateUnitUsecase:UpdateUnitUsecase,
        private readonly findAllUnitsUsacase:FindAllUnitsUsacase,
        private readonly findUnitByIdUsecase:FindUnitByIdUsecase,
        private readonly findAllUnitsByUserUsacase:FindAllUnitsByUserUsacase,
        private readonly deleteUnitUseCase:DeleteUnitUseCase,
        private readonly activateUnitUseCase:ActivateUnitUseCase,
        private readonly deActivateUnitUseCase:DeActivateUnitUseCase,
        private readonly deleteUnitPhotoUsecase:DeleteUnitPhotoUsecase,
        private readonly updateUnitPhotoUsease:UpdateUnitPhotoUsease,
        private readonly updateUnitAvgRateAndCountUsecase:UpdateUnitAvgRateAndCountUsecase,
        private readonly findUnitReviewsUsecase:FindUnitReviewsUsecase
    ){}


    async create(body:CreateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.createUnitUsecase.excute(body,currentUser)
    }

    async update(id:string,body:UpdateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.updateUnitUsecase.excute(id,body,currentUser)
    }

        async findAll(query:FindAllDto):Promise<PaginatedResult<UnitResponseDto>>{

            return await this.findAllUnitsUsacase.excute(query)

        }

        async  findById(id:string):Promise<UnitResponseDto>{
               return await this.findUnitByIdUsecase.excute(id)
        }

        async findAllByUser(query:FindAllDto,currentUser:currentUserData):Promise<PaginatedResult<UnitResponseDto>>{
             
            return await this.findAllUnitsByUserUsacase.excute(query,currentUser)
        }
            async softDelete(unitId:string,currentUser:currentUserData):Promise<void>{
                 
                return this.deleteUnitUseCase.excute(unitId,currentUser)
            }

         
            async activate(unitId:string,currentUser:currentUserData):Promise<UnitResponseDto>{

                return this.activateUnitUseCase.excute(unitId,currentUser)

            }

          async deactivate(unitId:string,currentUser:currentUserData):Promise<UnitResponseDto>{

                return this.deActivateUnitUseCase.excute(unitId,currentUser)

            }
            async deleteUnitPhotos(unitId:string,currentUser:currentUserData,body):Promise<void>{
                 await this.deleteUnitPhotoUsecase.excute(unitId,currentUser,body)
            }
            
                        async updateUnitPhotos(unitId:string,currentUser:currentUserData,photos:MulterFile[]):Promise<UnitResponseDto>{
                 return this.updateUnitPhotoUsease.excute(unitId,currentUser,photos)
            }
            async updateUnitAvgAndCount(body:UpdateUnitAvgAndCountDto,session?:ClientSession):Promise<void>{
                await this.updateUnitAvgRateAndCountUsecase.excute(body,session)
            }
            async findUnitReviews(unitId:string,query:PaginationDto):Promise<PaginatedResult<UnitReviews>>{
               return this.findUnitReviewsUsecase.excute(unitId,query)
            }




    
}
