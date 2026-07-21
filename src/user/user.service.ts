import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    findAll() { 
        return this.prisma.user.findMany({
            where: { deletedAt: null},
            select: {
                id: true,
                email: true,
                userName: true,
                role: true,
                createdAt: true,
            }
        });
    }
}
