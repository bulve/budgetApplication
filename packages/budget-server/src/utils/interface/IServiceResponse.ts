import {HttpStatus} from "@nestjs/common";

export interface IServiceResponse<T> {
    getStatus() : HttpStatus;
    getResponse() : IResponse<T>;
}

export interface IResponse<T> {
    data?: T
    errors?: IResponseError[]
}

export interface IResponseError {
    title: string
    link?: string
    code?: string
}