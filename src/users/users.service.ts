import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import {  ClientSession, QueryFilter } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user';
// import { ModelNames } from 'src/common/data-access';
import { UserRepository } from './repository/user.repository';
import { UserResponseDto } from './dto/user-response-dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserRawUsecase } from './use-cases/update-user-raw.usecase';

@Injectable()
export class UsersService {
         
      constructor(
           private readonly createUserUseCase:CreateUserUseCase,
            private  readonly userRepository:UserRepository,
            private readonly updateUserRawUsecase:UpdateUserRawUsecase


      //    ,@InjectModel(ModelNames.USERS) private userModel: Model<User>,
   ) {}

      async create(body:CreateUserDto):Promise<UserResponseDto>{
       
      return await this.createUserUseCase.excute(body)


      }

      async findOne(query:QueryFilter<User>):Promise<UserResponseDto>{
        
               
         const user= await this.userRepository.findOne(query)

         return plainToInstance(UserResponseDto,user)

      }
            async UpdateUserRaw(query:QueryFilter<User>,data:Record<string,any>,session?:ClientSession):Promise<void>{
            
                    await this.updateUserRawUsecase.excute(query,data,session)
            
                    
                }

      }


