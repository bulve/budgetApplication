import {IAccountRequest} from "./IAccountRequest";

export interface IAccountCreateRequest extends IAccountRequest{
    balance: number;
    openDate: Date;
}