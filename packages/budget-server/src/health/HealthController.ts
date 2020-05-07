import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class HealthController {

    @Get("/ping")
    async ping(@Res() res: Response) {
        res.status(HttpStatus.OK).json(Date.now());
    }
}