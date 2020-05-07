import {IAccountRequest} from "./IAccountRequest";

export interface IAccountUpdateRequest extends IAccountRequest{
    balance: number;
}