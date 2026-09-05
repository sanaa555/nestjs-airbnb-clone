import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import {  QueryFilter } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user';
// import { ModelNames } from 'src/common/data-access';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
         
      constructor(
                readonly createUserUseCase:CreateUserUseCase,
                                readonly userRepository:UserRepository


      //    ,@InjectModel(ModelNames.USERS) private userModel: Model<User>,
   ) {}

      async create(body:CreateUserDto){
      return this.createUserUseCase.excute(body)

      }

      async findOne(query:QueryFilter<User>){


         return await this.userRepository.findOne(query)

      }

}
