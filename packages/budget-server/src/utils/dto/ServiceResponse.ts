import { IResponseBody, IServiceResponse } from "../interface";
import { HttpStatus } from "@nestjs/common";

export class ServiceResponse<T> implements IServiceResponse<T> {
    private readonly httpStatus: HttpStatus;
    private readonly response: IResponseBody<T>;

    constructor(httpStatus: HttpStatus, response: IResponseBody<T>) {
        this.httpStatus = httpStatus;
        this.response = response;
    }

    getResponse(): IResponseBody<T> {
        return this.response;
    }

    getStatus(): HttpStatus {
        return this.httpStatus;
    }
}