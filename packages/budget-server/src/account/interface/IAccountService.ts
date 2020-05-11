import { IUserPayload, IServiceResponse } from "../../utils";
import { IAccountRequest } from "./IAccountRequest";
import { IAccount } from "./IAccount";
import { IAccountSuccess } from "./IAccountSuccess";
import { IAction } from "../../action";

export interface IAccountService {

    createAccount(userPayload: IUserPayload, accountRequest: IAccountRequest): Promise<IServiceResponse<IAccountSuccess>>;

    getAccount(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAccount>> ;

    getAccounts(userPayload: IUserPayload): Promise<IServiceResponse<IAccount[]>> ;

    getActions(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAction[]>> ;

    performAction(userPayload: IUserPayload, action: IAction, accountId: string): Promise<IServiceResponse<IAccountSuccess>>;
}