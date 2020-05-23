import {IServiceResponse, IUserPayload} from "../utils/interface";
import {IAction, IActionPerform} from "./interface";
import {IAccount, IAccountSuccess} from "../account/interface";
import {ServiceResponseFactory} from "../utils/factory";
import {Injectable} from "@nestjs/common";
import {ActionType} from "./enum";
import {AccountRepository} from "../account/AccountRepository";
import {ActionRepository} from "./ActionRepository";

@Injectable()
export class ActionService {

    constructor(
        private readonly actionRepository: ActionRepository,
        private readonly accountRepository: AccountRepository
    ) {}

    public async performAction(userPayload: IUserPayload, action: IActionPerform, accountId: string): Promise<IServiceResponse<IAccountSuccess>>{
        let newAction = this.actionRepository.create(action);
        newAction.accountId = accountId;
        newAction.timeStamp = new Date();

        return this.accountRepository.getOne(accountId)
            .then(account => {
                if(this.canPerformAction(newAction, account)) {
                    return this.performActionByType(newAction, account);
                } else {
                    throw Error(`Action '${newAction.type}' cannot be performed to Account '${account.name}'`);
                }
            })
            //TODO transactional creation is missing
            .then(account => this.accountRepository.save(account))
            .then(account => this.actionRepository.save(newAction))
            //TODO maybe instead of account id we need action id?
            .then(savedAction => ServiceResponseFactory.success({id: accountId}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public getActions(userPayload: IUserPayload, accountId: string): Promise<IServiceResponse<IAction[]>> {
        return this.accountRepository.getOne(accountId, userPayload.userId)
            .then(account => this.actionRepository.getAll(account.id))
            .then(actions => ServiceResponseFactory.success(actions))
            .catch(error => ServiceResponseFactory.failure(error.message))
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