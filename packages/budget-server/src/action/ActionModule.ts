import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ActionEntity} from "./entity";
import {ActionService} from "./ActionService";
import {ActionController} from "./ActionController";
import {ActionRepository} from "./ActionRepository";
import {AccountModule, AccountRepository} from "../account";

@Module({
    imports: [
        TypeOrmModule.forFeature([ActionEntity]),
        AccountModule
    ],
    controllers: [ActionController],
    providers: [ActionService, ActionRepository]
  })
export class ActionModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}