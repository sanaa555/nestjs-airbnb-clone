import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { UnitsService } from './units.service';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UnitIdDto } from './dtos/unit-id.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllDto } from './dtos/find-all-units.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { maxFileSize } from 'src/common/files/constants/file-count.constant';
import { createParseFilePipe } from 'src/common/files/validators/files-validation-factory';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { MulterFile } from 'src/files-upload/types/multer-file.type';


@Controller('units')
export class UnitsController {

    constructor(
                private readonly unitsService :UnitsService,
               private readonly filesUploadService :FilesUploadService

    ){}
 
     @Authorize(Roles.USER)
    @Post()
        @UseInterceptors(FilesInterceptor('photos',maxFileSize.UNITS_IMAGES))

    async create( @UploadedFiles( createParseFilePipe('2MB',['jpg','png']))    photos: MulterFile[],
      @Body() body:CreateUnitDto,
      @CurrentAccount() principale: Principale, ): Promise<UnitResponseDto>{
       // upload images s3- return list [url,url,url]
             const firstPhoto=photos[0]
             const uploadedPhotoUrl= await this.filesUploadService.uploadSingleFile(firstPhoto)
       //body.photos=[url,url,url]
       body.photos=[uploadedPhotoUrl]
        return this.unitsService.create(body,principale.user)
         

    }
         @Authorize(Roles.USER)
         @Patch('/:id')
         async update(@Param() Param:UnitIdDto,@Body() body:UpdateUnitDto,@CurrentAccount() principale: Principale): Promise<UnitResponseDto>{

            return this.unitsService.update(Param.id,body,principale.user)

         }
    @Public()
    @Get()
    async findAll(@Query() query:FindAllDto):Promise<PaginatedResult<UnitResponseDto>>{
        return this.unitsService.findAll(query)

    }

    @Authorize(Roles.USER)
     @Get('/my-units')
     async findAllByUser(@Query() query:FindAllDto,@CurrentAccount() principale:Principale):Promise<PaginatedResult<UnitResponseDto>>{

        return this.unitsService.findAllByUser(query,principale.user)
     }

     @Public()
    @Get('/:id')
     async findById ( @Param()param:UnitIdDto):Promise<UnitResponseDto>{
         return this.unitsService.findById(param.id)
     }

     @Authorize(Roles.USER)
     @HttpCode(HttpStatus.NO_CONTENT)
     @Delete("/:id")
     async softdelete(@Param() param:UnitIdDto,@CurrentAccount() principale:Principale):Promise<void>{
         
        return this.unitsService.softDelete(param.id,principale.user)

     }
    
      @Authorize(Roles.USER)
        @Patch('/:id/active')
     async activate(@Param() param:UnitIdDto,@CurrentAccount() principale:Principale):Promise<UnitResponseDto>{

        return this.unitsService.activate(param.id,principale.user)

     }

     
        @Authorize(Roles.USER)
        @Patch('/:id/deactive')
     async deactivate(@Param() param:UnitIdDto,@CurrentAccount() principale:Principale):Promise<UnitResponseDto>{

        return this.unitsService.deactivate(param.id,principale.user)

     }


     
}
