import {Body, Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request, Response} from "express";
import {IUserPayload} from "../utils/interface";
import {IAction} from "./interface";
import {ActionService} from "./ActionService";

@Controller("/api/action")
export class ActionController {

    constructor(private readonly actionService: ActionService) {}

    @UseGuards(AuthGuard("jwt"))
    @Get("/:accountId")
    async getActions(@Req() req: Request, @Res() res: Response, @Param("accountId") accountId) {
        let responseEntity = await this.actionService.getActions(req.user as IUserPayload, accountId);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/perform/:accountId")
    async performAction(@Req() req: Request, @Res() res: Response, @Param("accountId") accountId, @Body("action") action: IAction) {
        let responseEntity = await this.actionService.performAction(req.user as IUserPayload, action, accountId);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponse())
    }
}