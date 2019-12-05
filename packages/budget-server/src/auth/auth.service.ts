import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { comparePasswordsSync } from "../utils/password/pasword.hashing.service";
import { JwtService } from "@nestjs/jwt"
import { LoginRequest } from "./entity/login.entity";
import { ServiceResponseFactory, ServiceResponse } from "../utils/entity/response.entity";

@Injectable()
export class AuthService {

    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService
      ){}

    async login(loginRequest: LoginRequest): Promise<ServiceResponse> {
      if(!(loginRequest && loginRequest.userName && loginRequest.password)){
        return ServiceResponseFactory.failureWith("Username and password are required!");
      }
      return this.userService.getUser(loginRequest.userName)
        .then(user => {
          if(user) {
            if(comparePasswordsSync(loginRequest.password, user.password)) {
              return { userName: user.userName, sub: user.id };
            }
            throw Error(`Provided User '${user.userName}' password is incorect, please try again`);
          } 
          throw Error(`User '${loginRequest.userName}' not found`);
        })
        .then(payload => ServiceResponseFactory.successWith({ access_token: this.jwtService.sign(payload) }))
        .catch(error => ServiceResponseFactory.failureWith(error.message)) 
    }
}