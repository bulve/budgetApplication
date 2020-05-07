import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "../config";
import { IUserPayload } from "../utils";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("SECRET_KEY")
        })
    }

    async validate(payload: any): Promise<IUserPayload> {
        return {
            userId : payload.sub
        };
      }
}