import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigService } from "../config/config.service";

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