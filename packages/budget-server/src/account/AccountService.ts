import {HttpStatus, Injectable} from "@nestjs/common";
import {IServiceResponse, IUserPayload, ServiceResponseFactory} from "../utils";
import {IAccount, IAccountRequest, IAccountService, IAccountSuccess} from "./interface";
import {AccountRepository} from "./AccountRepository";

@Injectable()
export class AccountService implements IAccountService {

    constructor(private readonly accountRepository: AccountRepository){}

    public async createAccount(userPayload: IUserPayload, accountRequest: IAccountRequest): Promise<IServiceResponse<IAccountSuccess>> {
        const accountToCreate = {...accountRequest,
            timeStamp: accountRequest.timestamp ? accountRequest.timestamp : new Date(),
            userId: userPayload.userId
        };
        const account = this.accountRepository.create(accountToCreate);
        return this.accountRepository.save(account)
            .then(createdAccount => ServiceResponseFactory.success({id: createdAccount.id}, HttpStatus.CREATED))
            .catch(error =>  ServiceResponseFactory.failure(`Failed to create Account with error: '${error}'`))
    }

    public async getAccount(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAccount>> {
        return this.accountRepository.getOne(accountId, userPayload.userId)
            .then(account => {
                if(account){
                    return ServiceResponseFactory.success(account)
                }
                throw Error(`Account by id: ${accountId} for user: ${userPayload.userId} does not exist.`)
            })
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public async getAccounts(userPayload: IUserPayload): Promise<IServiceResponse<IAccount[]>> {
        return this.getAccountsByUserId(userPayload.userId)
            .then(accounts => ServiceResponseFactory.success(accounts))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public async updateAccount(userPayload: IUserPayload, accountId: string, accountRequest: IAccountRequest): Promise<IServiceResponse<string>> {
        //What about other properties
        //Can we update userID?
        return this.accountRepository.getOne(accountId, userPayload.userId)
            .then(account => this.accountRepository.save(Object.assign(account, accountRequest)))
            .then(updatedAccount => ServiceResponseFactory.success(updatedAccount.id))
            .catch(error => ServiceResponseFactory.failure(`Failed to update Account by id '${accountId}' for user '${userPayload.userId}' with error: '${error}'`));
    }

    private async getAccountsByUserId(userId: string): Promise<IAccount[]> {
        return this.accountRepository.getAll(userId);
    }

}

