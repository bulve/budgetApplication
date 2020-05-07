import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { ServiceResponseFactory, IServiceResponse, comparePasswordsSync } from "../utils";
import { ILoginRequest, ILoginSuccess } from "./interface";
import { UserService } from "../user";

@Injectable()
export class AuthService {

    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService
      ){}

    async login(loginRequest: ILoginRequest): Promise<IServiceResponse<ILoginSuccess>> {
      if(!(loginRequest && loginRequest.email && loginRequest.password)){
        return ServiceResponseFactory.failure("User email and password are required!");
      }
      return this.userService.getUser(loginRequest.email)
        .then(user => {
          if(user) {
            if(comparePasswordsSync(loginRequest.password, user.password)) {
              return { sub: user.id };
            }
            throw Error(`User: '${user.email}' password is incorrect, please try again`);
          }
          throw Error(`User: '${loginRequest.email}' is not found`);
        })
        .then(payload => ServiceResponseFactory.success({ access_token: this.jwtService.sign(payload) }))
        .catch(error => ServiceResponseFactory.failure(error.message))
    }
}