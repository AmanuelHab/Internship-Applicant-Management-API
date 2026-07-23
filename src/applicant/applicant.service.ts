import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateApplicantDto, UpdateApplicantDto, UpdateStatusDto, UpdateNoteDto, UpdateTrackDto } from "./dto";

@Injectable()

export class ApplicantService {
    constructor(private prisma: PrismaService){}

    // GET
    async findAll(){
        return this.prisma.applicant.findMany({
            where:{ deletedAt: null}
        })
    }

    // Get :id
    async findOne(id: number){
        return this.prisma.applicant.findUnique({
            where: {
                id: id,
                deletedAt: null,
            }
        })
    }

    // Post 
    async createApplicant(createApplicantDto: CreateApplicantDto){
        return this.prisma.applicant.create({
            data: {
               firstName: createApplicantDto.firstName,
               lastName: createApplicantDto.lastName,
               email: createApplicantDto.email,
               phone: createApplicantDto.phone,
               note: createApplicantDto.note,
               track: createApplicantDto.track,
               appliedDate: createApplicantDto.appliedDate 
            }
        });
    }

    // Patch :id
    async updateApplicant(id: number, data: UpdateApplicantDto){
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null
            },
            data
        });
    }

    // Delete :id 
    async deleteApplicant(id: number){
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null
            },
            data: { deletedAt: new Date()}
        })
    }

    // Patch :id/status
    updateStatus(id: number, updateStatusDto: UpdateStatusDto){
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null,
            },
            data: { status: updateStatusDto.status }
        })
    }

    // Patch :id/notes
    updateNote(id: number, updateNoteDto: UpdateNoteDto){
        return this.prisma.applicant.update({
            where:{ 
                id: id,
                deletedAt: null,
            },
            data: {note: updateNoteDto.note }
        });
    }

    // Patch :id/track
    updateTrack(id: number, updateTrackDto: UpdateTrackDto){
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null,
            },
            data: {track: updateTrackDto.track}
        });
    }

}