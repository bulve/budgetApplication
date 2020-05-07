import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthController } from "./HealthController";

@Module({
    controllers: [HealthController]
})
export class HealthModule implements NestModule {
    configure(customer: MiddlewareConsumer){}
}