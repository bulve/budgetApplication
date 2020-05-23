import { Repository} from "typeorm";
import {AccountEntity} from "../src/account/entity";
import {ActionEntity} from "../src/action/entity";

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
  };

// // @ts-ignore
// export const budgetRepositoryMockFactory: () => MockType<Repository<AccountEntity>> = jest.fn(() => ({
//     findOne: jest.fn(entity => entity),
//     save: jest.fn(entity => entity),
//     // create: jest.fn(entity => dtoToBudget(entity))
// }));
//
// // @ts-ignore
// export const actionRepositoryMockFactory: () => MockType<Repository<ActionEntity>> = jest.fn(() => ({
// findOne: jest.fn(entity => entity),
// }));

// function dtoToBudget(budgetDTO: BudgetDTO) {
//     let budget = new Budget();
//     budget.name = budgetDTO.name;
//     budget.id = Math.random().toString();
//     return budget;
// }

// describe.skip("Budget Service Testing",  () => {
//     let app: TestingModule;
//     let accountService: AccountService;
//     let budgetRepository: Repository<AccountEntity>;
//     let actionRepository: Repository<ActionEntity>;
//
//     const testConnectionName = "BudgetServiceTestConnection"
//     beforeEach(async ()  => {
//         app = await Test.createTestingModule({
//             providers: [
//                 AccountService,
//                 {provide: getRepositoryToken(AccountEntity), useClass: Repository},
//                 {provide: getRepositoryToken(ActionEntity), useClass: Repository}
//             ],
//         }).compile();
//         let connection = await createConnection({
//             type: "mysql",
//             database: "test_memory",
//             dropSchema: true,
//             username: 'root',
//             password: 'samas1970',
//             entities: [AccountEntity, ActionEntity],
//             synchronize: true,
//             logging: false,
//             name: testConnectionName
//         });
//         actionRepository = getRepository(ActionEntity, testConnectionName);
//         budgetRepository = getRepository(AccountEntity, testConnectionName);
//         accountService = new AccountService(budgetRepository, actionRepository);
//
//         return connection;
//     });
//
//     afterEach(async () => {
//         return await getConnection(testConnectionName).close()
//     })
// });