import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateApplicantDto, UpdateApplicantDto, UpdateStatusDto, UpdateNoteDto, UpdateTrackDto, ApplicantsQueryDto } from "./dto";
import { ApplicationStatus } from "generated/prisma/enums";
import { Prisma } from "src/generated/prisma/client";

@Injectable()

export class ApplicantService {
    constructor(private prisma: PrismaService){}

    // GET
    async findAll(query: ApplicantsQueryDto){
        const {page, limit, search, status, track, sortBy, order } = query;
        const where: Prisma.ApplicantWhereInput = {
            deletedAt: null,
            ...(status ? {status }: {}),
            ...(track ? { track }: {}),
            ...(search
                ? {
                    OR: [
                        { firstName: {contains: search, mode: 'insensitive'}},
                        { lastName: { contains: search, mode: 'insensitive'}},
                        { email: { contains: search, mode: 'insensitive'}}
                    ],
                }: {}),
        }
        const [data, total] = await this.prisma.$transaction([
                this.prisma.applicant.findMany({
                where,
                orderBy: {[sortBy]: order},
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.applicant.count({ where})
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit))
            }
        };
    }

    // Get :id
    async findOne(id: number){
        const user = this.prisma.applicant.findUnique({
            where: {
                id: id,
                deletedAt: null,
            }
        });
        if(!user){
            throw new BadRequestException('User not found');
        }
        return user;
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
    async updateStatus(id: number, updateStatusDto: UpdateStatusDto){
        const applicant = await this.findOne(id);
        if(applicant && applicant.status === ApplicationStatus.REJECTED && updateStatusDto.status === ApplicationStatus.ACCEPTED){
            throw new BadRequestException('An applicant cannot move directly from Rejected to Accepted')
        }
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null,
            },
            data: { status: updateStatusDto.status }
        })
    }

    // Patch :id/notes
    async updateNote(id: number, updateNoteDto: UpdateNoteDto){
        return this.prisma.applicant.update({
            where:{ 
                id: id,
                deletedAt: null,
            },
            data: {note: updateNoteDto.note }
        });
    }

    // Patch :id/track
    async updateTrack(id: number, updateTrackDto: UpdateTrackDto){
        return this.prisma.applicant.update({
            where: {
                id: id,
                deletedAt: null,
            },
            data: {track: updateTrackDto.track}
        });
    }

}