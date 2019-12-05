import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserPayload } from "../utils/entity/user.entity";
import { ConfigService } from "../config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("SECRET_KEY")
        })
    }

    async validate(payload: any): Promise<UserPayload> {
        return new UserPayload(payload.userName, payload.sub);
      }
}