import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDto{
    @IsString({message: 'Email must be a string'})
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email'})
    email: string;

    @IsString({ message: 'Password must be a string'})
    @IsNotEmpty({ message: 'Password is required'})
    password: string;
}