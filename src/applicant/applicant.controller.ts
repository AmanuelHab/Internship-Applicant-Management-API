import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Controller('applicants')

export class ApplicantController {
    constructor(private applicantService: ApplicantService){}

    @Get()
    findAll(){ return this.applicantService.findAll();}

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){ return this.applicantService.findOne(id)}

    @Post()
    createApplicant(@Body() createApplicantDto: CreateApplicantDto){ return this.applicantService.createApplicant(createApplicantDto); }

    @Patch(':id')
    updateApplicant(@Param('id', ParseIntPipe) id: number,
                    @Body() updateApplicantDto: UpdateApplicantDto){ return this.applicantService.updateApplicant(id, updateApplicantDto); }

    @Delete(':id')
    deleteApplicant(@Param('id', ParseIntPipe) id: number){ return this.applicantService.deleteApplicant(id); }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number,
                 @Body() updateStatusDto: UpdateStatusDto){ return this.applicantService.updateStatus(id, updateStatusDto)}

    @Patch(':id/note')
    updateNote(@Param('id', ParseIntPipe) id: number,
                @Body() updateNoteDto: UpdateNoteDto) { return this.applicantService.updateNote(id,updateNoteDto)}
    
    @Patch(':id/track')
    updateTrack(@Param('id', ParseIntPipe) id: number,
                @Body() updateTrackDto: UpdateTrackDto){
                    return this.applicantService.updateTrack(id, updateTrackDto);
                }

}