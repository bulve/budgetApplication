import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entity";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";
import { AccountModule } from "../account";


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        AccountModule
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {}
}