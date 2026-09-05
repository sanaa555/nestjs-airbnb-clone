import {  Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { ModelNames } from "src/common/data-access";
import { UserRepository } from "../repository/user.repository";



@Injectable()
export class CreateUserUseCase{
    constructor(
      
      // @InjectModel(ModelNames.USERS) private userModel: Model<User>

      private readonly userRepository:UserRepository
   ){}

    async excute(body:CreateUserDto){
            //1- Check if user with the same email already exists
    
             const existingUserByEmail = await this.userRepository.findOne({ email: body.email });
             if(existingUserByEmail){
                throw new BadRequestException('User with this email already exists');
             }
            //2- Check phone number duplicate
            const existingUserByPhoneNumber = await this.userRepository.findOne({ phoneNumber: body.phoneNumber });
             if(existingUserByPhoneNumber){
                throw new BadRequestException('User with this phone number already exists');
             }
             
            //3- Hash password
            const hashedPassword= bcrypt.hashSync(body.password,10)
               
            //4- Create user and save the user to the database
            return  await this.userRepository.create({
                 ...body,
                    password:hashedPassword
            })
    
    
          }

}