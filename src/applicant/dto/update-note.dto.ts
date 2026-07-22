import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class UpdateNoteDto {
    @IsString({ message: 'Note must be a string'})
    @IsNotEmpty({ message: 'Note is required'})
    @MaxLength(1000, {message: 'Note must not exceed 1,000 characters'})
    note: string;
}