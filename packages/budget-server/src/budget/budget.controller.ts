import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { BudgetDTO } from "./entity/budget.entity";
import { ActionDTO } from "./entity/action.entity";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UserPayload } from "../utils/entity/user.entity";

@Controller("/api/budget")
export class BudgetController {
    constructor(private readonly budgetService: BudgetService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("/new")
    async createBudget(@Res() res: Response, @Req() req: Request, @Body("budget") budget: BudgetDTO) {
        let responseEntity = await this.budgetService.createBudget(req.user as UserPayload, budget);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject());
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getBudgets(@Req() req: Request, @Res() res: Response) {
        let responseEntity = await this.budgetService.getBudgets(req.user as UserPayload);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject())
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/action/:budgetId")
    async getActions(@Req() req: Request, @Res() res: Response, @Param("budgetId") budgetId) {
        let responseEntity = await this.budgetService.getActions(req.user as UserPayload, budgetId);
        res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject())
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/action/:budgetId")
    async perfomAction(@Req() req: Request, @Res() res: Response, @Param("budgetId") budgetId, @Body("action") actionDTO: ActionDTO) {
        let responseEntity = await this.budgetService.performAction(req.user as UserPayload, actionDTO, budgetId)
        res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject())
    }
}
