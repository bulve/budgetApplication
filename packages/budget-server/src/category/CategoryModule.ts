import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entity";
import { CategoryController } from "./CategoryController";
import { CategoryService } from "./CategoryService";


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity])
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {}
}