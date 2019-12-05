import { AuthService } from "./auth.service";
import { Controller, Post, Body, Get, Res, UseGuards, Req } from "@nestjs/common";
import { UserDTO } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";
import { LoginRequest } from "./entity/login.entity";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
        ) {}

    @Post("login")
    async login(@Res() res: Response, @Body("login") loginRequest: LoginRequest) {
        let loginResponse = await this.authService.login(loginRequest)
        res.status(loginResponse.getStatus()).json(loginResponse.getResponseObject())
    }

    @Post("register")
    async register(@Res() res: Response, @Body("user") userDTO: UserDTO) {
        let response = await this.userService.createUser(userDTO);
        res.status(response.getStatus()).json(response.getResponseObject())
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("users")
    async users(@Req() req: Request) {
        return await this.userService.getUsers();
    }
}