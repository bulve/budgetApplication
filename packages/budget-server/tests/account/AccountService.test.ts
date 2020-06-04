import { Test } from "@nestjs/testing";
import { HttpStatus } from "@nestjs/common";
import {MockType} from "../testUtils";
import { AccountService, IAccount, AccountRepository} from "../../src/account";

describe("AccountService", () => {

    const mockAccountId = "accountId";
    const mockUserPayload = {userId: "123"};

    function createAccount(): IAccount;
    function createAccount(amount?: number): IAccount;
    function createAccount(amount?: number, id?: string): IAccount;
    function createAccount(amount?: number, id?: string, userId?: string): IAccount {
        return {
            id: id ? id : mockAccountId,
            balance: amount ? amount : 0,
            name: "accountName",
            timestamp: new Date("2018-01-01"),
            userId: userId ? userId : mockUserPayload.userId,
        };
    }

    // @ts-ignore
    const accountRepositoryMockFactory: () => MockType<AccountRepository> = jest.fn(() => ({
        save: jest.fn(entity => Promise.resolve({ ...entity, id: mockAccountId})),
        create: jest.fn(entity => entity),
        getOne: jest.fn().mockImplementation((accountId) => {
            return Promise.resolve(createAccount(200, accountId));
        }),
        getAll: jest.fn().mockImplementation(userId => {
            return Promise.resolve([createAccount(123),  createAccount(99),  createAccount(15)]);
        })
    }));

    let accountService: AccountService;
    let accountRepository: AccountRepository;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AccountService,
                {provide: AccountRepository, useFactory: accountRepositoryMockFactory},
            ]
        }).compile();
        accountService = module.get(AccountService);
        accountRepository = module.get(AccountRepository);
    });
    describe("createAccount", () => {
        it("should create account successfully", async () => {
            const accountToCreate = createAccount();
            let response = await accountService.createAccount(mockUserPayload, accountToCreate);
            expect(response.getStatus()).toBe(HttpStatus.CREATED);
            expect(response.getResponse().data).toStrictEqual({id: mockAccountId});
            expect(accountRepository.create).toHaveBeenCalledTimes(1);
            expect(accountRepository.save).toHaveBeenCalledTimes(1);
        })
    });

    describe("getAccounts", () => {
        it("should return accounts successfully", async () => {
            let response = await accountService.getAccounts(mockUserPayload);
            expect(response.getStatus()).toBe(HttpStatus.OK);
            expect(response.getResponse().data).toHaveLength(3);
            expect(accountRepository.getAll).toHaveBeenCalledTimes(1);
            expect(accountRepository.getAll).toHaveBeenCalledWith(mockUserPayload.userId);
        })
    });

    describe("getAccount", () => {
        it("should get accounts successfully", async () => {
            const account = createAccount(200, mockAccountId);
            accountRepository.getOne  = jest.fn().mockImplementation((accountId) => {
                return Promise.resolve(account);
            });
            let response = await accountService.getAccount(mockUserPayload, mockAccountId);
            expect(response.getStatus()).toBe(HttpStatus.OK);
            expect(response.getResponse().data).toBe(account);
            expect(accountRepository.getOne).toHaveBeenCalledTimes(1);
            expect(accountRepository.getOne).toHaveBeenCalledWith(mockAccountId, mockUserPayload.userId);
        })
    });

    describe("updateAccount", () => {
        it("should update accounts successfully", () => {

        })
    });
});

