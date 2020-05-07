import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./AccountController";
import { AccountService } from "./AccountService";
import { AccountEntity, ActionEntity } from "./entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity, ActionEntity])
    ],
    controllers: [AccountController],
    providers: [AccountService]
  })
export class AccountModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}