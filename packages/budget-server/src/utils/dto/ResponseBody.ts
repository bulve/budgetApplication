import {IResponseBody, IResponseError} from "../interface";

export class ResponseBody<T> implements IResponseBody<T>{

    constructor(data: T, errors: IResponseError[], success: boolean) {
    }
}