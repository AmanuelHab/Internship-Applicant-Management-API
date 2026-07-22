import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Prisma } from "../generated/prisma/client";
import * as argon2 from "argon2";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async findAll() { 
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
    }

    async createUser(createUserDto: CreateUserDto){
        const hashedPassword = await argon2.hash(createUserDto.password);
        try{
            const newUser = await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    passwordHash : hashedPassword,
                },
                select: {
                    id: true, 
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                message: 'User created successfully',
                data: newUser
            };

        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'){
                throw new ConflictException('This email is already in use.')
            }
            throw error;
        }

    }
}
