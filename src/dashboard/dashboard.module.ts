import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { DashBoardService } from "./dashboard.service";

@Module({
    controllers: [DashboardController],
    providers: [DashBoardService],
})

export class DashboardModule {}