import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./AccountController";
import { AccountService } from "./AccountService";
import { AccountEntity } from "./entity";
import { ActionEntity } from "../action";

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity, ActionEntity])
    ],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService]
  })
export class AccountModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}