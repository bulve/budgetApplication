import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { IUserPayload, ServiceResponseFactory, IServiceResponse } from "../utils";
import { IAccount, IAccountService, IAction } from "./interface";
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

    async createAccount(userPayload: IUserPayload, accountRequest: IAccountCreateRequest): Promise<IServiceResponse<string>> {
        const account = this.accountRepository.create(accountRequest);
        account.userId = userPayload.userId;
        account.timestamp = account.timestamp ? account.timestamp : new Date();
        return this.accountRepository.save(account)
            .then(createdAccount => ServiceResponseFactory.success(createdAccount.id))
            .catch(error =>  ServiceResponseFactory.failure(`Failed to create Account with error: '${error}'`))
        // message: `Account with name '${createdAccount.name}' was created successfully`
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

    public async performAction(userPayload: IUserPayload, action: IAction, budgetId: string): Promise<IServiceResponse<string>>{
        let newAction = this.actionRepository.create(action);
        newAction.accountId = budgetId;
        newAction.timeStamp = new Date();
        
        return this.accountRepository.findOne(budgetId)
            .then(budget => {
                if(budget.userId == userPayload.userId) {
                    return budget;
                } else {
                    throw Error(`User does not have Budget by id '${budgetId}' and cannot perform actions`);
                }
            })
            .then(account => {
                if(this.canPerformAction(newAction, account)) {
                    return this.performeAction(newAction, account);
                } else {
                    throw Error(`Action '${newAction.type}' cannot be perfomed to Budget '${account.name}'`);
                }
            })
            .then(budget => this.saveAccount(budget))
            .then(budget => this.saveAction(newAction))
            .then(savedAction => ServiceResponseFactory.success(`Action '${savedAction.type}' for '${savedAction.amount}' was performed on Budget by id '${budgetId}'`))
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

    private performeAction(action: IAction, account: IAccount): IAccount {
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

