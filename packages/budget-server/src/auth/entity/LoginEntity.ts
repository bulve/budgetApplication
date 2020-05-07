import { HttpStatus } from "@nestjs/common";
import {ILoginResponse} from "../interface";

export class LoginRequest {
    constructor(public userName: string, public password: string){}
}

export class LoginResponse implements ILoginResponse{

    public httpStatus: HttpStatus;
    public message: string | undefined;
    public responseObject: any | undefined;

    public static failureWithMessage(message: string) {
        let response = new LoginResponse();
        response.httpStatus = HttpStatus.FORBIDDEN;
        response.message = message;
        response.responseObject = { message };
        return response;
    }

    public static successWithMessage(message: string) {
        let response = new LoginResponse();
        response.httpStatus = HttpStatus.OK;
        response.message = message;
        response.responseObject = { message };
        return response;
    }

    public static successWithAny(responseObject: any) {
        let response = new LoginResponse();
        response.httpStatus = HttpStatus.OK;
        response.responseObject = responseObject;
        return response;
    }
}