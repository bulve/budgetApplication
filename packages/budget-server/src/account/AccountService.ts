import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { IUserPayload, ServiceResponseFactory, IServiceResponse } from "../utils";
import {IAccount, IAccountService, IAccountSuccess, IAction} from "./interface";
import { AccountEntity, ActionEntity } from "./entity";
import { ActionType } from "./enum";
import {IAccountCreateRequest} from "./interface/IAccountCreateRequest";
import {IAccountUpdateRequest} from "./interface/IAccountUpdateRequest";

@Injectable()
export class AccountService implements IAccountService {

    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        @InjectRepository(ActionEntity)
        private readonly actionRepository: Repository<ActionEntity>
        ){}

    public async createAccount(userPayload: IUserPayload, accountRequest: IAccountCreateRequest): Promise<IServiceResponse<IAccountSuccess>> {
        const account = this.accountRepository.create(accountRequest);
        account.userId = userPayload.userId;
        account.timestamp = account.timestamp ? account.timestamp : new Date();
        return this.accountRepository.save(account)
            .then(createdAccount => ServiceResponseFactory.success({id: createdAccount.id}))
            .catch(error =>  ServiceResponseFactory.failure(`Failed to create Account with error: '${error}'`))
    }

    public async getAccount(userPayload: IUserPayload): Promise<IServiceResponse<IAccount[]>> {
        return this.getBudgetsByUserId(userPayload.userId)
            .then(budgets => ServiceResponseFactory.success(budgets))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public async updateAccount(userPayload: IUserPayload, accountId: string, accountRequest: IAccountUpdateRequest): Promise<IServiceResponse<string>> {
        //What about other properties
        //Can we update userID?
        return this.accountRepository.findOne({id: accountId, userId: userPayload.userId})
            .then(acc => this.accountRepository.save({...acc, accountRequest}))
            .then(updatedAccount => ServiceResponseFactory.success(updatedAccount.id))
            .catch(error => ServiceResponseFactory.failure(`Failed to update Account by id '${accountId}' for user '${userPayload.userId}' with error: '${error}'`));
    }

    public async performAction(userPayload: IUserPayload, action: IAction, accountId: string): Promise<IServiceResponse<IAccountSuccess>>{
        let newAction = this.actionRepository.create(action);
        newAction.accountId = accountId;
        newAction.timeStamp = new Date();
        
        return this.accountRepository.findOne(accountId)
            .then(budget => {
                if(budget.userId == userPayload.userId) {
                    return budget;
                } else {
                    throw Error(`User does not have Budget by id '${accountId}' and cannot perform actions`);
                }
            })
            .then(account => {
                if(this.canPerformAction(newAction, account)) {
                    return this.performActionByType(newAction, account);
                } else {
                    throw Error(`Action '${newAction.type}' cannot be perfomed to Budget '${account.name}'`);
                }
            })
            //TODO transactional creation is missing
            .then(budget => this.saveAccount(budget))
            .then(budget => this.saveAction(newAction))
            //TODO maybe instead of account id we need action id?
            .then(savedAction => ServiceResponseFactory.success({id: accountId}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public getActions(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAction[]>> {
        return this.accountRepository.findOne(accountId)
            .then(budget => {
                if(budget.userId == userPayload.userId) {
                    return budget;
                } else {
                    throw Error(`User does not have Account by id '${accountId}' and cannot review it actions`)
                }
            })
            .then(budget => this.actionRepository.find({accountId: accountId}))
            .then(actions => ServiceResponseFactory.success(actions))
            .catch(error => ServiceResponseFactory.failure(error.message))

    }

    private async getBudgetsByUserId(userId: string): Promise<IAccount[]> {
        return this.accountRepository.find({userId});
    }

    private saveAccount(account: IAccount):Promise<IAccount> {
        return this.accountRepository.save(account);
    }

    private saveAction(action: IAction): Promise<IAction> {
        return this.actionRepository.save(action);
    }

    private canPerformAction(action: IAction, account: IAccount) {
        if (action.type === ActionType.WITHDRAW) {
            return account.balance >= action.amount && action.amount >= 0
        } else if (action.type == ActionType.DEPOSIT) {
            return action.amount > 0
        }
        return false;
    }

    private performActionByType(action: IAction, account: IAccount): IAccount {
        if (action.type === ActionType.WITHDRAW) {
            account.balance = account.balance - action.amount;
            return account;
        } else if (action.type == ActionType.DEPOSIT) {
            account.balance = account.balance + action.amount;
            return account;
        }
        return account;
    }
}

