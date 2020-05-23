import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpStatus } from "@nestjs/common";
import {UserEntity} from "../../src/user/entity";
import {UserService} from "../../src/user";
import {encryptPasswordSync} from "../../src/utils/password";
import {MockType} from "../TestUtils";

describe("User Service Testing",  () => {

    // @ts-ignore
    const userRepositoryMockFactory: () => MockType<Repository<UserEntity>> = jest.fn(() => ({
        save: jest.fn(entity => Promise.resolve(entity)),
        create: jest.fn(entity => entity),
    }));

    let userService: UserService;
    let userRepository: Repository<UserEntity>;
    beforeEach(async ()  => {
        let module = await Test.createTestingModule({
            providers: [
                UserService,
                {provide: getRepositoryToken(UserEntity), useFactory: userRepositoryMockFactory},
            ],
        }).compile();
        userRepository = module.get(getRepositoryToken(UserEntity));
        userService = module.get(UserService);
    });

    it("should create user entity", async () => {
        let user = {
            email: "email@email.com", password: "password"
        };
        let serviceResponse = await userService.createUser(user);
        expect(serviceResponse.getStatus()).toBe(HttpStatus.OK);
        expect(serviceResponse.getResponse().data).toStrictEqual({email: user.email});

        expect(userRepository.create).toHaveBeenCalledTimes(1);
        expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it("should update User password Test", async () => {
        let user = {
            email: "email@email.com",
            password: encryptPasswordSync("oldPassword")
        };
        userRepository.findOne = jest.fn().mockImplementation((us) =>  Promise.resolve(user));
        let serviceResponse = await userService.updatePassword("UserName", "oldPassword", "newPassword");
        expect(serviceResponse.getStatus()).toBe(HttpStatus.OK);
        expect(serviceResponse.getResponse().data).toStrictEqual({email: user.email})
    });
});