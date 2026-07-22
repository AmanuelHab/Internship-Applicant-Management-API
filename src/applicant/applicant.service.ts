import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Injectable()

export class ApplicantService {
    constructor(private prisma: PrismaService){}

    // GET
    async findAll(){}

    // Get :id
    async findOne(id){}

    // Post 
    createApplicant(createApplicantDto: CreateApplicantDto){}

    // Patch :id
    updateApplicant(id, updateApplicantDto: UpdateApplicantDto){}

    // Delete :id 
    deleteApplicant(id){}

    // Patch :id/status
    updateStatus(id, updateStatusDto: UpdateStatusDto){}

    // Patch :id/notes
    updateNote(id, updateNoteDto: UpdateNoteDto){}

    // Patch :id/track
    updateTrack(id, updateTrackDto: UpdateTrackDto){}

}