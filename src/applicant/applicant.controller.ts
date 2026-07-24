import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto, UpdateApplicantDto, UpdateStatusDto, UpdateNoteDto, UpdateTrackDto, ApplicantsQueryDto } from "./dto";
import { ResponseUtil } from "src/common/utils/response.util";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Applicants')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('applicants')

export class ApplicantController {
    constructor(private applicantService: ApplicantService){}

    @Get()
    async findAll(@Query() query: ApplicantsQueryDto){ 
        const applicants = await this.applicantService.findAll(query);
        return ResponseUtil.success(200, 'Applicants retrieved successfully', applicants)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number){ 
        const applicant = await this.applicantService.findOne(id);
        return ResponseUtil.success(200, 'Applicant retrieved successfully', applicant);
    }

    @Post()
    async createApplicant(@Body() createApplicantDto: CreateApplicantDto){ 
        const applicant = await this.applicantService.createApplicant(createApplicantDto);
        return ResponseUtil.success(201, 'Applicant created successfully', applicant);
    }

    @Patch(':id')
    async updateApplicant(@Param('id', ParseIntPipe) id: number, @Body() updateApplicantDto: UpdateApplicantDto){ 
        const applicant = await this.applicantService.updateApplicant(id, updateApplicantDto);
        return ResponseUtil.success(200, 'Applicant updated successfully', applicant);
    }

    @Delete(':id')
    async deleteApplicant(@Param('id', ParseIntPipe) id: number){ 
        const applicant = await this.applicantService.deleteApplicant(id);
        return ResponseUtil.success(200, 'Applicant deleted successfully', applicant);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() updateStatusDto: UpdateStatusDto){ 
        const applicant = await this.applicantService.updateStatus(id, updateStatusDto);
        return ResponseUtil.success(200, 'Applicant updated successfully', applicant);
    }

    @Patch(':id/note')
    async updateNote(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) { 
        const applicant = await this.applicantService.updateNote(id,updateNoteDto);
        return ResponseUtil.success(200, 'Applicant updated successfully', applicant);
    }
    
    @Patch(':id/track')
    async updateTrack(@Param('id', ParseIntPipe) id: number, @Body() updateTrackDto: UpdateTrackDto){
        const applicant = await this.applicantService.updateTrack(id, updateTrackDto);
        return ResponseUtil.success(200, 'Applicant updated successfully', applicant);
    }

}