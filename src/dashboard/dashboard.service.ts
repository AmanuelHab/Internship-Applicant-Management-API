import { Injectable } from "@nestjs/common";
import { ApplicationStatus, Track } from "src/generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DashBoardService {
    constructor(private prisma: PrismaService){}

    async getSummary(){
        const baseWhere = { deletedAt: null};
        const statuses = Object.values(ApplicationStatus);
        const tracks = Object.values(Track);

        const [total, statusCounts, trackCounts] = await Promise.all([
            this.prisma.applicant.count({where: baseWhere}),
            Promise.all(statuses.map((status) => this.prisma.applicant.count({ where: { ...baseWhere, status}}))),
            Promise.all(tracks.map((track) => this.prisma.applicant.count({ where: {...baseWhere, track}})))
        ]);

        const byStatus = statuses.reduce((acc, status, i) => {
            acc[status] = statusCounts[i];
            return acc;
        }, {} as Record<ApplicationStatus, number>);

        const byTrack = tracks.reduce((acc, track, i) =>{
            acc[track] = trackCounts[i];
            return acc;
        }, {} as Record<Track, number>);
        
        return { totalApplicants: total, byStatus, byTrack};
    }

}