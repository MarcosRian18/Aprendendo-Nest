import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    role: number
}