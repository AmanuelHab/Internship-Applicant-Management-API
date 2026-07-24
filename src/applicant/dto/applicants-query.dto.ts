import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApplicationStatus } from "generated/prisma/enums";
import { Track } from "src/generated/prisma/enums";


export class ApplicantsQueryDto {
    @IsOptional()
    @IsInt({message: 'page must be an integer'})
    @Min(1, {message: 'page must be at least 1'})
    page: number = 1;

    @IsOptional()
    @IsInt({message: 'limit must be an integer'})
    @Min(1, {message: 'limit must be at least 1'})
    @Max(100, { message: 'limit must not exceed 100'})
    limit: number= 10;

    @IsOptional()
    @IsString({message: 'search must be a string'})
    search?: string;

    @IsOptional()
    @IsEnum(ApplicationStatus, {message: 'Invalid status filter'})
    status?: ApplicationStatus;

    @IsOptional()
    @IsEnum(Track, {message: 'Invalid track filter'})
    track?: Track;

    @IsOptional()
    @IsIn(['firstName', 'lastName', 'email', 'appliedDate', 'status', 'track', 'createdAt'], {message: 'sortBy must be one of: firstName, lastName, email, appliedDate, status, track or createdAt'})
    sortBy: string = 'createdAt';

    @IsOptional()
    @IsIn(['asc', 'desc'], {message: 'order must be "asc" or "desc"'})
    order: 'asc' | 'desc' = 'desc';
}