import { HttpStatus } from "@nestjs/common";

export interface ServiceResponse {
    getStatus() : HttpStatus;
    getResponseObject() : any;
}

export class ServiceResponseFactory<T> implements ServiceResponse {

    private httpStatus: HttpStatus;
    private responseObject: T | undefined;

    public static failureWith<T>(t: T) {
        let response = new ServiceResponseFactory<T>();
        response.httpStatus = HttpStatus.FORBIDDEN;
        response.responseObject = t
        return response;
    }

    public static successWith<T>(t: T) {
        let response = new ServiceResponseFactory<T>();
        response.httpStatus = HttpStatus.OK;
        response.responseObject = t
        return response;
    }

    public static with<T>(httpStatus: HttpStatus, t: T) {
        let response = new ServiceResponseFactory<T>();
        response.httpStatus = httpStatus;
        response.responseObject = t;
        return response;
    }

    public getStatus(): HttpStatus {
        return this.httpStatus;
    }

    public getResponseObject(): T {
        return this.responseObject;
    }
}