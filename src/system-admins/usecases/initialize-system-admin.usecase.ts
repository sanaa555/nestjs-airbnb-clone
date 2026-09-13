import { Injectable, Logger } from "@nestjs/common";
import { SystemAdminRepository } from "../repositories/system-admins.repository";
import { ConfigService } from "@nestjs/config";
import { Environment, ISystemAdmin } from "src/common/configration/environment.interface";
import bcrypt from 'bcrypt'

@Injectable()
export class InitializeSystemAdminUseCase{
         private readonly  logger =new Logger(InitializeSystemAdminUseCase.name)
    
    constructor(
        private readonly systemAdminRepository:SystemAdminRepository,
        private readonly configService:ConfigService<Environment>
    ){}

    async excute():Promise<void>{
        // read date from env
        const {name,email,password}= this.configService.getOrThrow<ISystemAdmin>('systemAdmin')

        // check if system admin already init
        const systemAdmin= await this.systemAdminRepository.findOne({
            email
        })

        if(systemAdmin){
            this.logger.log('system admin already initialized')
            return;
        }
        // if not create one
        const hashedPassword= await bcrypt.hash(password,10)
        await this.systemAdminRepository.create({name,
            email,
            password:hashedPassword,
             isSuperAdmin:true})

            this.logger.log('system admin  initialized')


    }


}