import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {  UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './use-cases/create-user';
import { ModelNames } from 'src/common/data-access';
import { UserRepository } from './repository/user.repository';
import { UpdateUserRawUsecase } from './use-cases/update-user-raw.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: ModelNames.USERS, schema: UserSchema }])],
  providers: [UsersService,CreateUserUseCase,UserRepository,UpdateUserRawUsecase],
  exports: [UsersService]
})
export class UsersModule {}
