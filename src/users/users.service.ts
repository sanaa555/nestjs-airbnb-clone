import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

      constructor(@InjectModel("User") private userModel: Model<User>) {}

      async create(body:CreateUserDto){
        //1- Check if user with the same email already exists

         const existingUserByEmail = await this.userModel.findOne({ email: body.email });
         if(existingUserByEmail){
            throw new BadRequestException('User with this email already exists');
         }
        //2- Check phone number duplicate
        const existingUserByPhoneNumber = await this.userModel.findOne({ phoneNumber: body.phoneNumber });
         if(existingUserByPhoneNumber){
            throw new BadRequestException('User with this phone number already exists');
         }
        //3- Hash password
        const hashedPassword=bcrypt.hashSync(body.password,10)
           
        //4- Create user and save the user to the database
        return  await this.userModel.create({
             ...body,
                password:hashedPassword
        })


      }

}
