import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity";
import { UserService } from "./UserService";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule{
    configure(customer: MiddlewareConsumer){
        // customer
        // .apply([])
        // .forRoutes('api')
    }
}