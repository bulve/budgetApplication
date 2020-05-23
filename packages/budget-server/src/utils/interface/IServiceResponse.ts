import {HttpStatus} from "@nestjs/common";

export interface IServiceResponse<T> {
    getStatus() : HttpStatus;
    getResponse() : IResponseBody<T>;
}

export interface IResponseBody<T> {
    data?: T
    errors?: IResponseError[]
    success?: boolean
}

export interface IResponseError {
    title: string
    link?: string
    code?: string
}