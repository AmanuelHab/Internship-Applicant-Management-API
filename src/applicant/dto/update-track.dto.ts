import { IsEnum, IsNotEmpty } from "class-validator";
import { Track } from "src/generated/prisma/enums";


export class UpdateTrackDto {
    @IsEnum(Track, {message: 'Invallid track'})
    @IsNotEmpty({message: 'Track is required'})
    track: Track;
    
}