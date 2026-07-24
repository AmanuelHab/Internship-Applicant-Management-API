import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ResponseUtil } from "src/common/utils/response.util";
import { SignUpDto } from "./dto/signup.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        const token = await this.authService.login(loginDto);
        return ResponseUtil.success(200, 'Logged in successfully', { token });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe() {
        return 'User info';
    }

}