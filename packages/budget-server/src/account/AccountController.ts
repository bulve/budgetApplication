import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { IUserPayload } from "../utils";
import { AccountService } from "./AccountService";
import { IAccountRequest } from "./interface";

@Controller("/api/account")
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("")
    async createAccount(@Res() res: Response, @Req() req: Request, @Body("account") accountRequest: IAccountRequest) {
        let responseEntity = await this.accountService.createAccount(req.user as IUserPayload, accountRequest);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse());
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getAccount(@Req() req: Request, @Res() res: Response) {
        let responseEntity = await this.accountService.getAccounts(req.user as IUserPayload);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }

    @Post("/:id")
    async updateAccount(@Req() req: Request, @Res() res: Response,  @Param("accountId") accountId, @Body("account") accountRequest: IAccountRequest) {
        let responseEntity = await this.accountService.updateAccount(req.user as IUserPayload, accountId, accountRequest);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }
}
