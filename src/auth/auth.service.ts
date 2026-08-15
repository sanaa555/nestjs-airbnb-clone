import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService) {}

   async  register(body:RegisterDto){
    const createUserDto:CreateUserDto={...body}
        // 1-create a new user in the database using the data from the body
       const user= await this.userService.create(createUserDto);

       return user;

        // this.userService.createUser(body);
        //2-generate a JWT token for the user
        //3-return the token to the user
    }
}
