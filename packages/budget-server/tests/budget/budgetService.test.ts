import { Test } from "@nestjs/testing";
import { BudgetController } from "../../src/budget/budget.controller";
import { BudgetService } from "../../src/budget/budget.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Action, ActionDTO, ActionType } from "../../src/budget/entity/action.entity";
import { MockType } from "../testUtils";
import { Repository } from "typeorm";

import { HttpStatus } from "@nestjs/common";
import { BudgetDTO, Budget } from "../../src/budget/entity/budget.entity";

// @ts-ignore
export const budgetRepositoryMockFactory: () => MockType<Repository<Budget>> = jest.fn(() => ({
    save: jest.fn(entity => Promise.resolve(entity)),
    create: jest.fn(entity => dtoToBudget(entity)),
}));

// @ts-ignore
export const actionRepositoryMockFactory: () => MockType<Repository<Action>> = jest.fn(() => ({
    create: jest.fn(entity => dtoToAction(entity)),
    save: jest.fn(entity => entity)
}));

function dtoToAction(actionDTO: ActionDTO) {
    let action = new Action();
    action.amount = actionDTO.amount;
    action.type = actionDTO.type;
    action.description = actionDTO.description;
    return action;
}

function dtoToBudget(budgetDTO: BudgetDTO) {
    let budget = new Budget();
    budget.name = budgetDTO.name;
    budget.id = "budgetId"
    return budget;
}

describe("Budget Service Tests", () => {
    let budgetService: BudgetService;
    let budgetRepository: Repository<Budget>;
    let actionRepository: Repository<Action>;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [BudgetController],
            providers: [
                BudgetService,
                {provide: getRepositoryToken(Action), useFactory: actionRepositoryMockFactory},
                {provide: getRepositoryToken(Budget), useFactory: budgetRepositoryMockFactory}
            ]
        }).compile();
        budgetService = module.get(BudgetService);
        budgetRepository = module.get(getRepositoryToken(Budget));
        actionRepository = module.get(getRepositoryToken(Action));
    })

    it("Should return list of mocked budgets", async () => {
        budgetRepository.find = jest.fn().mockImplementation(userId => {
            let budget1 = new Budget();
            budget1.userId = userId;
            budget1.id = "budget1";
            let budget2 = new Budget();
            budget2.userId = userId;
            budget2.id = "budget2";
            return [budget1, budget2];
        })
        let payload = {userId: "123", userName: "Vy"};
        let response = await budgetService.getBudgets(payload);
        expect(response.getStatus()).toBe(HttpStatus.OK);
        expect(response.getResponseObject() as Budget[]).toHaveLength(2)
        expect(budgetRepository.find).toHaveBeenCalledTimes(1);
        expect(budgetRepository.find).toHaveBeenCalledWith({"userId" : payload.userId});
    })

    it("Should create budget", async () => {
        let budgetDTO = new BudgetDTO("DTO");
        let response = await budgetService.createBudget({userId: "userId", userName: "userName"}, budgetDTO);
        expect(response.getStatus()).toBe(HttpStatus.OK);
        expect(response.getResponseObject()).toBe("Budget with name 'DTO' was created succesfuly");
        expect(budgetRepository.create).toHaveBeenCalledTimes(1);
        expect(budgetRepository.create).toHaveBeenCalledWith(budgetDTO);
        expect(budgetRepository.save).toHaveBeenCalledTimes(1);
    })

    it("Should successfuly perfome Deposit and Withdraw actions with the same amount", async () => {
        let payload = {userId: "123", userName: "Vy"};
        budgetRepository.findOne = jest.fn().mockImplementation((budgetId) => {
            let budget = new Budget();
            budget.id = budgetId;
            budget.balance = 200;
            budget.name = "budget1";
            budget.openDate = new Date("2018-01-01");
            budget.userId = payload.userId;
            return Promise.resolve(budget);
        })
        let depositAction = new ActionDTO(ActionType.DEPOSIT, "Deposit some money", 1000)
        let response = await budgetService.performAction(payload, depositAction, "budget1");
        expect(response.getStatus()).toBe(HttpStatus.OK);
        expect(response.getResponseObject()).toBe("Action 'DEPOSIT' for '1000' where perfomed on Budget by id 'budget1'");
        expect(actionRepository.create).toHaveBeenCalledTimes(1);
        expect(actionRepository.create).toHaveBeenCalledWith(depositAction);
        expect(actionRepository.save).toHaveBeenCalledTimes(1);
        expect(budgetRepository.findOne).toHaveBeenCalledTimes(1);
        expect(budgetRepository.findOne).toHaveBeenCalledWith("budget1");
        expect(budgetRepository.save).toHaveBeenCalledTimes(1);
    })
    
    it("Should fail to deposit negative amount", async () => {
        let payload = {userId: "123", userName: "Vy"};
        budgetRepository.findOne = jest.fn().mockImplementation((budgetId) => {
            let budget = new Budget();
            budget.balance = 200;
            budget.name = "budget1"
            budget.id = budgetId;
            budget.userId = payload.userId;
            return Promise.resolve(budget);
        })
        let depositAction = new ActionDTO(ActionType.DEPOSIT, "Deposit some money", -2)
        let response = await budgetService.performAction(payload, depositAction, "budget1");
        expect(response.getStatus()).toBe(HttpStatus.FORBIDDEN);
        expect(response.getResponseObject()).toBe("Action 'DEPOSIT' cannot be perfomed to Budget 'budget1'");

        expect(actionRepository.create).toHaveBeenCalledTimes(1);
        expect(actionRepository.create).toHaveBeenCalledWith(depositAction);
        expect(actionRepository.save).toHaveBeenCalledTimes(0);

        expect(budgetRepository.findOne).toHaveBeenCalledTimes(1);
        expect(budgetRepository.findOne).toHaveBeenCalledWith("budget1");
        expect(budgetRepository.save).toHaveBeenCalledTimes(0);
    })
        
    it("Should fail when Withdraw more than it is present in Budget balance", async () => {
        let payload = {userId: "123", userName: "Vy"};
        budgetRepository.findOne = jest.fn().mockImplementation((budgetId) => {
            let budget = new Budget();
            budget.balance = 200;
            budget.name = "budget1";
            budget.id = budgetId;
            budget.userId = payload.userId;
            return Promise.resolve(budget);
        })
        let action = new ActionDTO(ActionType.WITHDRAW, "Deposit some money", 201)
        let response = await budgetService.performAction(payload, action, "budget1");
        expect(response.getStatus()).toBe(HttpStatus.FORBIDDEN);
        expect(response.getResponseObject()).toBe("Action 'WITHDRAW' cannot be perfomed to Budget 'budget1'");

        expect(actionRepository.create).toHaveBeenCalledTimes(1);
        expect(actionRepository.create).toHaveBeenCalledWith(action);
        expect(actionRepository.save).toHaveBeenCalledTimes(0);

        expect(budgetRepository.findOne).toHaveBeenCalledTimes(1);
        expect(budgetRepository.findOne).toHaveBeenCalledWith("budget1");
        expect(budgetRepository.save).toHaveBeenCalledTimes(0);
    })
})

