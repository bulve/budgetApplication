import {HttpStatus} from "@nestjs/common";

export interface ILoginResponse {
    httpStatus: HttpStatus;
    message: string | undefined;
    responseObject: any | undefined;
}