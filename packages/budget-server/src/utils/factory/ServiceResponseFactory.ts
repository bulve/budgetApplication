import {HttpStatus} from "@nestjs/common";
import {ServiceResponse} from "../dto";
import {IServiceResponse} from "../interface";

export class ServiceResponseFactory<T> {

    public static failure<T>(errorMessage: string, httpStatus?: HttpStatus): IServiceResponse<T> {
        return new ServiceResponse<T>(
            httpStatus ? httpStatus : HttpStatus.BAD_REQUEST,
            {errors: [{title: errorMessage}], success: false});
    }

    public static success<T>(data: T, httpStatus?: HttpStatus): IServiceResponse<T> {
        return new ServiceResponse<T>(
            httpStatus ? httpStatus : HttpStatus.OK,
            {data: data, success: true});
    }
}