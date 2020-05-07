import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { IUserPayload } from "../utils";
import { IAction } from "./interface";
import { AccountService } from "./AccountService";
import {IAccountCreateRequest} from "./interface/IAccountCreateRequest";
import {IAccountUpdateRequest} from "./interface/IAccountUpdateRequest";

@Controller("/api/account")
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("")
    async createAccount(@Res() res: Response, @Req() req: Request, @Body("account") accountRequest: IAccountCreateRequest) {
        let responseEntity = await this.accountService.createAccount(req.user as IUserPayload, accountRequest);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse());
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getAccount(@Req() req: Request, @Res() res: Response) {
        let responseEntity = await this.accountService.getAccount(req.user as IUserPayload);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }

    @Post("/:id")
    async updateAccount(@Req() req: Request, @Res() res: Response,  @Param("accountId") accountId, @Body("account") accountRequest: IAccountUpdateRequest) {
        let responseEntity = await this.accountService.updateAccount(req.user as IUserPayload, accountId, accountRequest);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/action/:accountId")
    async getActions(@Req() req: Request, @Res() res: Response, @Param("accountId") accountId) {
        let responseEntity = await this.accountService.getActions(req.user as IUserPayload, accountId);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/action/:accountId")
    async performAction(@Req() req: Request, @Res() res: Response, @Param("accountId") budgetId, @Body("action") action: IAction) {
        let responseEntity = await this.accountService.performAction(req.user as IUserPayload, action, budgetId);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }
}
