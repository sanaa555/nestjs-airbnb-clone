import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user';

@Injectable()
export class UsersService {
         
      constructor(
                readonly createUserUseCase:CreateUserUseCase

         ,@InjectModel("User") private userModel: Model<User>,
   ) {}

      async create(body:CreateUserDto){
      return this.createUserUseCase.excute(body)

      }

      async findOne(query:QueryFilter<User>){


         return await this.userModel.findOne(query)

      }

}
