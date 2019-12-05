import { NestMiddleware, MiddlewareFunction } from "@nestjs/common";

export class BudgetMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction{
        return (req, res, next) => {
            if(next !== undefined) {
                next();
            }
        }
    }
}