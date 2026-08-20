import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {  User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './use-cases/create-user';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService,CreateUserUseCase],
  exports: [UsersService]
})
export class UsersModule {}
