import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./entity";
import { AccountController } from "./AccountController";
import { AccountService } from "./AccountService";
import {AccountRepository} from "./AccountRepository";

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity])
    ],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository],
    exports: [AccountService, AccountRepository]
  })
export class AccountModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}