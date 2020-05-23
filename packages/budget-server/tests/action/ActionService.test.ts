import {Test} from "@nestjs/testing";
import {HttpStatus} from "@nestjs/common";
import {MockType} from "../TestUtils";
import {ActionType} from "../../src/action";
import {IAccount} from "../../src/account";
import {AccountRepository} from "../../src/account/AccountRepository";
import {ActionRepository} from "../../src/action/ActionRepository";
import {ActionService} from "../../src/action/ActionService";

describe("ActionService", () => {

    const mockAccountId = "accountId";
    const mockCategoryId = "categoryId";
    const mockUserPayload = {userId: "123"};

    function createAccount(amount: number, id?: string): IAccount {
        return {
            id: id ? id : mockAccountId,
            balance: amount,
            name: "accountName",
            timestamp: new Date("2018-01-01"),
            userId: mockUserPayload.userId,
        };
    }

    function createAction(amount: number, actionType: ActionType) {
        return {
            type: actionType,
            amount: amount,
            categoryId: mockCategoryId,
            accountId: mockAccountId
        };
    }

    // @ts-ignore
    const accountRepositoryMockFactory: () => MockType<AccountRepository> = jest.fn(() => ({
        save: jest.fn(entity => Promise.resolve({ ...entity, id: mockAccountId})),
        create: jest.fn(entity => entity),
        getOne: jest.fn().mockImplementation((accountId) => {
            return Promise.resolve(createAccount(200, accountId));
        })
    }));

    // @ts-ignore
    const actionRepositoryMockFactory: () => MockType<ActionRepository> = jest.fn(() => ({
        create: jest.fn(entity => entity),
        save: jest.fn(entity => entity),
    }));

    let actionService: ActionService;
    let actionRepository: ActionRepository;
    let accountRepository: AccountRepository;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ActionService,
                {provide: ActionRepository, useFactory: actionRepositoryMockFactory},
                {provide: AccountRepository, useFactory: accountRepositoryMockFactory}
            ]
        }).compile();
        actionService = module.get(ActionService);
        actionRepository = module.get(ActionRepository);
        accountRepository = module.get(AccountRepository);
    });

    describe("performAction", () => {
        it("should successfully perform DEPOSIT ", async () => {
            let depositAction = createAction(1000, ActionType.DEPOSIT);
            let response = await actionService.performAction(mockUserPayload, depositAction, mockAccountId);
            expect(response.getStatus()).toBe(HttpStatus.OK);
            expect(response.getResponse().data).toStrictEqual({id:mockAccountId});

            expect(actionRepository.create).toHaveBeenCalledTimes(1);
            expect(actionRepository.create).toHaveBeenCalledWith(depositAction);
            expect(accountRepository.getOne).toHaveBeenCalledTimes(1);
            expect(accountRepository.getOne).toHaveBeenCalledWith(mockAccountId);

            expect(accountRepository.save).toHaveBeenCalledTimes(1);
            expect(actionRepository.save).toHaveBeenCalledTimes(1);
        });
        it("should fail to DEPOSIT negative amount", async () => {
            const depositAction = createAction(-2, ActionType.DEPOSIT);
            let response = await actionService.performAction(mockUserPayload, depositAction, mockAccountId);
            expect(response.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(response.getResponse().data).toBeUndefined();
            expect(response.getResponse().errors).toHaveLength(1);
            expect(response.getResponse().errors[0].title).toBe("Action 'DEPOSIT' cannot be performed to Account 'accountName'");

            expect(actionRepository.create).toHaveBeenCalledTimes(1);
            expect(actionRepository.create).toHaveBeenCalledWith(depositAction);
            expect(accountRepository.getOne).toHaveBeenCalledTimes(1);
            expect(accountRepository.getOne).toHaveBeenCalledWith(mockAccountId);

            expect(accountRepository.save).toHaveBeenCalledTimes(0);
            expect(actionRepository.save).toHaveBeenCalledTimes(0);
        });
        it("should fail when WITHDRAW more than Account balance", async () => {
            let action = createAction(201, ActionType.WITHDRAW);
            let response = await actionService.performAction(mockUserPayload, action, mockAccountId);
            expect(response.getStatus()).toBe(HttpStatus.BAD_REQUEST);
            expect(response.getResponse().data).toBeUndefined();
            expect(response.getResponse().errors).toHaveLength(1);
            expect(response.getResponse().errors[0].title).toBe("Action 'WITHDRAW' cannot be performed to Account 'accountName'");

            expect(actionRepository.create).toHaveBeenCalledTimes(1);
            expect(actionRepository.create).toHaveBeenCalledWith(action);
            expect(accountRepository.getOne).toHaveBeenCalledTimes(1);
            expect(accountRepository.getOne).toHaveBeenCalledWith(mockAccountId);

            expect(accountRepository.save).toHaveBeenCalledTimes(0);
            expect(actionRepository.save).toHaveBeenCalledTimes(0);
        })
    });
});

