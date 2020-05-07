import { Controller, Post, Body, Get, Res, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request } from "express";
import { UserService, IUserRequest } from "../user";
import { AuthService } from "./AuthService";
import { ILoginRequest } from "./interface";

@Controller("/api")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
        ) {}

    @Post("/login")
    async login(@Res() res: Response, @Body("login") loginRequest: ILoginRequest) {
        let loginResponse = await this.authService.login(loginRequest);
        res.status(loginResponse.getStatus()).json(loginResponse.getResponse())
    }

    @Post("/register")
    async register(@Res() res: Response, @Body("user") user: IUserRequest) {
        let response = await this.userService.createUser(user);
        res.status(response.getStatus()).json(response.getResponse())
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/users")
    async users(@Req() req: Request) {
        return await this.userService.getUsers();
    }
}