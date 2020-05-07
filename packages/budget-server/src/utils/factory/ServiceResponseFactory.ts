import { HttpStatus } from "@nestjs/common";
import { ServiceResponse } from "../dto";

export class ServiceResponseFactory<T> {

    public static failure<T>(...errorMessages: string[]) {
        const response = {
            errors: errorMessages.map(error => { return {title: error}})
        };
        return new ServiceResponse<T>(HttpStatus.BAD_GATEWAY, response);
    }

    public static success<T>(data: T) {
        return new ServiceResponse(HttpStatus.OK, {data});
    }
}