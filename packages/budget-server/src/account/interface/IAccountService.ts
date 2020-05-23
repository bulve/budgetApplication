import { IUserPayload, IServiceResponse } from "../../utils";
import { IAccount } from "./IAccount";
import { IAccountSuccess } from "./IAccountSuccess";
import {IAccountRequest} from "./IAccountRequest";

export interface IAccountService {

    createAccount(userPayload: IUserPayload, accountRequest: IAccountRequest): Promise<IServiceResponse<IAccountSuccess>>;

    getAccount(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAccount>> ;

    getAccounts(userPayload: IUserPayload): Promise<IServiceResponse<IAccount[]>> ;
}