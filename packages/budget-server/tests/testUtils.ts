import { Repository, createConnection, getRepository, getConnection } from "typeorm";
import { Budget, BudgetDTO } from "../src/budget/entity/budget.entity";
import { Action } from "../src/budget/entity/action.entity";
import { TestingModule, Test } from "@nestjs/testing";
import { BudgetService } from "../src/budget/budget.service";
import { getRepositoryToken } from "@nestjs/typeorm";

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
  };

// @ts-ignore
export const budgetRepositoryMockFactory: () => MockType<Repository<Budget>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    create: jest.fn(entity => dtoToBudget(entity))
}));

// @ts-ignore
export const actionRepositoryMockFactory: () => MockType<Repository<Action>> = jest.fn(() => ({
findOne: jest.fn(entity => entity),
}));

function dtoToBudget(budgetDTO: BudgetDTO) {
    let budget = new Budget();
    budget.name = budgetDTO.name;
    budget.id = Math.random();
    return budget;
}

describe.skip("Budget Service Testing",  () => {
    let app: TestingModule;
    let budgetService: BudgetService;
    let budgetRepository: Repository<Budget>;
    let actionRepository: Repository<Action>;

    const testConnectionName = "BudgetServiceTestConnection"
    beforeEach(async ()  => {    
        app = await Test.createTestingModule({
            providers: [
                BudgetService, 
                {provide: getRepositoryToken(Budget), useClass: Repository},
                {provide: getRepositoryToken(Action), useClass: Repository}
            ],
        }).compile();
        let connection = await createConnection({
            type: "mysql",
            database: "test_memory",
            dropSchema: true,
            username: 'root',
            password: 'samas1970',
            entities: [Budget, Action],
            synchronize: true,
            logging: false,
            name: testConnectionName
        });  
        actionRepository = getRepository(Action, testConnectionName);
        budgetRepository = getRepository(Budget, testConnectionName);
        budgetService = new BudgetService(budgetRepository, actionRepository)

        return connection;
    })

    afterEach(async () => {
        return await getConnection(testConnectionName).close()
    })
})