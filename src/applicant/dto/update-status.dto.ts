import { IsEnum, IsNotEmpty } from "class-validator";
import { ApplicationStatus } from "src/generated/prisma/enums";


export class UpdateStatusDto {
    @IsEnum(ApplicationStatus, {message: 'Invalid status'})
    @IsNotEmpty({ message: 'Status is required'})
    status: ApplicationStatus;
}