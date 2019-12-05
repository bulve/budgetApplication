import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Budget } from "./entity/budget.entity";
import { Action } from "./entity/action.entity";
import { BudgetController } from "./budget.controller";
import { BudgetService } from "./budget.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Budget, Action])
    ],
    controllers: [BudgetController],
    providers: [BudgetService]
  })
export class BudgetModule implements NestModule{
    configure(customer: MiddlewareConsumer){}
}