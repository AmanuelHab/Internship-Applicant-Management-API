import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Track } from "src/generated/prisma/enums";


export class CreateApplicantDto{
    @IsString({message: 'Name must be a string'})
    @IsNotEmpty({message: 'First name is required'})
    firstName: string;

    @IsString({message: 'Name must be a string'})
    @IsNotEmpty({message: 'Last name is required'})
    lastName: string;

    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty({ message: 'Email is required'})
    email: string;

    @IsOptional()
    @IsString({message: 'Phone must be a string'})
    phone: string;

    @IsOptional()
    @IsString({message: 'Note must be a string'})
    @MaxLength(1000, {message: 'Note must not exceed 1,000 characters'})
    note: string;

    @IsEnum(Track, {message: 'Invalid track selected'})
    @IsNotEmpty({ message: 'Track is required'})
    track: Track;

    @IsOptional()
    @IsDate({message: 'Applied date must be a date'})
    appliedDate: Date;
}