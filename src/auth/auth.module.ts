import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions:{ expiresIn: process.env.TOKEN_EXPIRATION ? parseInt(process.env.TOKEN_EXPIRATION, 10): 900}
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}