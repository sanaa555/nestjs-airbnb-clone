import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import {  QueryFilter } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user';
// import { ModelNames } from 'src/common/data-access';
import { UserRepository } from './repository/user.repository';
import { UserResponseDto } from './dto/user-response-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
         
      constructor(
                readonly createUserUseCase:CreateUserUseCase,
                                readonly userRepository:UserRepository


      //    ,@InjectModel(ModelNames.USERS) private userModel: Model<User>,
   ) {}

      async create(body:CreateUserDto):Promise<UserResponseDto>{
       
      return await this.createUserUseCase.excute(body)


      }

      async findOne(query:QueryFilter<User>):Promise<UserResponseDto>{
        
               
         const user= await this.userRepository.findOne(query)

         return plainToInstance(UserResponseDto,user)

      }

}
