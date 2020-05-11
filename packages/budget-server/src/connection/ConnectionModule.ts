import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user";
import { ConfigService } from "../config";
import { ConnectionOptions } from "typeorm";
import { AccountEntity } from "../account";
import {ActionEntity} from "../action";
import {CategoryEntity} from "../category";

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
                entities: [AccountEntity, ActionEntity, UserEntity, CategoryEntity],
                synchronize: true
            } as ConnectionOptions),
            inject: [ConfigService],
          })
    ],
  })
export class ConnectionModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}