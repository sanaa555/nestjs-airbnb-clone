import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnitCategoryDto{
   @IsString()
   @IsNotEmpty()
    name:string;

    @IsString()
    @IsOptional()
    icon?:string
}