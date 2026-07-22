import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        const DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5434/${process.env.POSTGRES_DB}?schema=public`;
        const adapter = new PrismaPg({
            connectionString: DATABASE_URL,
        });
        super({ adapter });
    }
}