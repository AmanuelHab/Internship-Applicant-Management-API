import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DashBoardService } from "./dashboard.service";
import { ResponseUtil } from "src/common/utils/response.util";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Dashboard')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController{
    constructor(private dashboardService: DashBoardService){}

    @Get('summary')
    async getSummary(){
        const summary = await this.dashboardService.getSummary();
        return ResponseUtil.success(200, 'Dashboard summery retrieved successfully', summary);
    }
}