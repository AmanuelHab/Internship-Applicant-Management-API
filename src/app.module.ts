import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicantModule } from './applicant/applicant.module';

@Module({
  imports: [AuthModule, PrismaModule, ApplicantModule],
})
export class AppModule {}
