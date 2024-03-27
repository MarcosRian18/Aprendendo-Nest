import { Controller, Post, Body, Headers, UseGuards, Request } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/createLogin.dto";
import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthForgetDTO } from "./dto/authForget.dto";
import { AuthResetPassDTO } from "./dto/authResetPass.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/authGuard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
        
        ){}
    @Post('login')
    async login(@Body() body: AuthLoginDTO){
        return this.authService.login(body.email,body.password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() body: AuthForgetDTO){
        return this.authService.forget(body.email)
    }

    @Post('reset')
    async reset(@Body() body: AuthResetPassDTO){
        return this.authService.reset(body.password,body.token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Request() req){
        return{me: 'ok', data: req.tokenPayload}
    }

    @Post('photo')
    async uploadPhoto(@Body('file') photo){
        return {photo}
    }
}