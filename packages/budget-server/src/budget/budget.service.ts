import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Budget, BudgetDTO } from "./entity/budget.entity";
import { Repository } from "typeorm";
import { Action, ActionDTO, ActionType } from "./entity/action.entity";
import { UserPayload } from "../utils/entity/user.entity";
import { ServiceResponseFactory, ServiceResponse } from "../utils/entity/response.entity";

@Injectable()
export class BudgetService implements IBudgetService {

    constructor(
        @InjectRepository(Budget)
        private readonly budgetRepository: Repository<Budget>,
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>
        ){}

    async createBudget(userPayload: UserPayload, budgetDTO: BudgetDTO): Promise<ServiceResponse> {
        const budget = this.budgetRepository.create(budgetDTO);
        budget.userId = userPayload.userId;
        budget.openDate = budget.openDate ? budget.openDate : new Date();
        return this.budgetRepository.save(budget)
            .then(createdBudget => ServiceResponseFactory.successWith(`Budget with name '${createdBudget.name}' was created succesfuly`))
            .catch(error =>  ServiceResponseFactory.failureWith(`Failed to create budget with error: '${error}'`))
    }

    public async getBudgets(userPayload: UserPayload): Promise<ServiceResponse> {
        return this.getBudgetsByUserId(userPayload.userId)
            .then(budgets => ServiceResponseFactory.successWith(budgets))
            .catch(error => ServiceResponseFactory.failureWith(error.message))
    }

    public async performAction(userPayload: UserPayload, actionDTO: ActionDTO, budgetId: string): Promise<ServiceResponse>{
        let action = this.actionRepository.create(actionDTO);
        action.budgetId = budgetId;
        action.timeStamp = new Date()
        
        return this.budgetRepository.findOne(budgetId)
            .then(budget => {
                if(budget.userId == userPayload.userId) {
                    return budget;
                } else {
                    throw Error(`User does not have Budget by id '${budgetId}' and cannot perform actions`);
                }
            })
            .then(budget => {
                if(this.canActionBePerfomed(action, budget)) {
                    return this.performeAction(action, budget);
                } else {
                    throw Error(`Action '${action.type}' cannot be perfomed to Budget '${budget.name}'`);
                }
            })
            .then(budget => this.saveBudget(budget))
            .then(budget => this.saveAction(action))
            .then(action => ServiceResponseFactory.successWith(`Action '${action.type}' for '${action.amount}' where perfomed on Budget by id '${budgetId}'`))
            .catch(error => ServiceResponseFactory.failureWith(error.message))        
    }

    public getActions(userPayload: UserPayload, budgetId: string): Promise<ServiceResponse> {
        return this.budgetRepository.findOne(budgetId)
            .then(budget => {
                if(budget.userId == userPayload.userId) {
                    return budget;
                } else {
                    throw Error(`User does not have Budget by id '${budgetId}' and cannot review it actions`)
                }
            })
            .then(budget => this.actionRepository.find({budgetId}))
            .then(actions => ServiceResponseFactory.successWith(actions))
            .catch(error => ServiceResponseFactory.failureWith(error.message))        

    }

    private async getBudgetsByUserId(userId: string): Promise<Budget[]> {
        return this.budgetRepository.find({userId}); 
    }

    private saveBudget(budget: Budget):Promise<Budget> {
        return this.budgetRepository.save(budget);
    }

    private saveAction(action: Action): Promise<Action> {
        return this.actionRepository.save(action);
    }

    private canActionBePerfomed(action: Action, budget: Budget) {
        if (action.type === ActionType.WITHDRAW) {
            return budget.balance >= action.amount && action.amount >= 0
        } else if (action.type == ActionType.DEPOSIT) {
            return action.amount > 0
        }
        return false;
    }

    private performeAction(action: Action, budget: Budget): Budget {
        if (action.type === ActionType.WITHDRAW) {
            budget.balance = budget.balance - action.amount;
            return budget;
        } else if (action.type == ActionType.DEPOSIT) {
            budget.balance = budget.balance + action.amount;
            return budget;
        }
        return budget;
    }
}

export interface IBudgetService {

    createBudget(userPayload: UserPayload, budgetDTO: BudgetDTO): Promise<ServiceResponse>;

    getBudgets(userPayload: UserPayload): Promise<ServiceResponse> ;

    getActions(userPayload: UserPayload, budgetId: string): Promise<ServiceResponse> ;

    performAction(userPayload: UserPayload, actionDTO: ActionDTO, budgetId: string): Promise<ServiceResponse>;
}