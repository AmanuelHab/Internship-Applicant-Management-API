import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicantModule } from './applicant/applicant.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, PrismaModule, ApplicantModule, DashboardModule],
})
export class AppModule {}
