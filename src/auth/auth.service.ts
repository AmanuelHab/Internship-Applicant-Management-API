import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import * as argon from "argon2";
import { SignUpDto } from "./dto/signup.dto";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async login(loginDto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email}
        });
        if (!user){
            throw new ForbiddenException('Invalid credentials');
        }

        const passwordMatches = await argon.verify( user.passwordHash, loginDto.password);
        if (!passwordMatches){
            throw new ForbiddenException('Invalid credentials.');
        }
        
        const token = await this.signToken(user.id, user.email);
        return token;
    }

    async signup(signupDto: SignUpDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: signupDto.email}
        });
        if(userExists){
            throw new ConflictException('User with this email already exists');
        }

        const passwordHash = await argon.hash(signupDto.password);

        const user = await this.prisma.user.create({
            data:{
                email: signupDto.email,
                passwordHash,
            },
            omit: {passwordHash: true}
        });
        return user;
    }

    async signToken( userId: number, email: string){
        const payload = {
            sub: userId,
            email,
        }
        
        return this.jwt.signAsync(payload);
    }
}