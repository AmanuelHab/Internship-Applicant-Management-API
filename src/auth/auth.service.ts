import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    // constructor(private prisma: PrismaService){}

    login(){
        return 'HI'; 
    }

    signup() {}
}