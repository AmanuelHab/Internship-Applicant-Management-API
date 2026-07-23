import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class SignUpDto{
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    @IsString({message: 'Email must be string'})
    email: string;

    @IsNotEmpty({ message: 'Password is required'})
    @MinLength(6, { message: 'Password must be at least 6 characters'})
    @IsString({message: 'Password must be string'})
    password: string;
}