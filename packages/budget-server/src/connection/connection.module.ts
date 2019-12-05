import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Budget } from "../budget/entity/budget.entity";
import { Action } from "../budget/entity/action.entity";
import { User } from "../user/entity/user.entity";
import { ConfigService } from "../config/config.service";
import { ConnectionOptions } from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: configService.get("DATABASE_TYPE"),
                host: configService.get("DATABASE_HOST"),
                port: Number(configService.get("DATABASE_PORT")),
                username: configService.get("DATABASE_USERNAME"),
                password: configService.get("DATABASE_PASSWORD"),
                database: configService.get("DATABASE_NAME"),
                entities: [Budget, Action, User],
                synchronize: true
            } as ConnectionOptions),
            inject: [ConfigService],
          })
    ],
  })
export class ConnectionModule implements NestModule{
    configure(customer: MiddlewareConsumer){}
}