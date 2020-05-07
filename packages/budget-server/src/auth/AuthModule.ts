import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { JwtStrategy } from "./JwtStrategy";
import { ConfigService } from "../config";
import { UserModule } from "../user";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('SECRET_KEY'),
              signOptions: { expiresIn: "1d" }
            }),
            inject: [ConfigService],
          })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule implements NestModule{
    configure(customer: MiddlewareConsumer){
        // customer
        // .apply([])
        // .forRoutes('api')
    }
}