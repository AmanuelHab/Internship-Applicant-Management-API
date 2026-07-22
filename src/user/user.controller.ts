import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }
}