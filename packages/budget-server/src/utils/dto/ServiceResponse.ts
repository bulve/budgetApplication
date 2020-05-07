import { IResponse, IServiceResponse } from "../interface";
import { HttpStatus } from "@nestjs/common";

export class ServiceResponse<T> implements IServiceResponse<T> {
    private readonly httpStatus: HttpStatus;
    private readonly response: IResponse<T>;

    constructor(httpStatus: HttpStatus, response: IResponse<T>) {
        this.httpStatus = httpStatus;
        this.response = response;
    }

    getResponse(): IResponse<T> {
        return this.response;
    }

    getStatus(): HttpStatus {
        return this.httpStatus;
    }
}