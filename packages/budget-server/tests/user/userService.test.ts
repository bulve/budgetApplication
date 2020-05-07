// import { Test } from "@nestjs/testing"
// import { getRepositoryToken } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User, UserDTO, Role } from "../../src/user/entity/user.entity";
// import { UserService } from "../../src/user/user.service";
// import { HttpStatus } from "@nestjs/common";
// import { encryptPasswordSync } from "../../src/utils/password/pasword.hashing.service";
//
// export type MockType<T> = {
//     [P in keyof T]: jest.Mock<{}>;
//   };
//
// // @ts-ignore
// export const userRepositoryMockFactory: () => MockType<Repository<User>> = jest.fn(() => ({
//     save: jest.fn(entity => Promise.resolve(entity)),
//     create: jest.fn(entity => entity),
// }));
//
//
//
// describe("User Service Testing",  () => {
//     let userService: UserService;
//     let userRepository: Repository<User>;
//     beforeEach(async ()  => {
//         let module = await Test.createTestingModule({
//             providers: [
//                 UserService,
//                 {provide: getRepositoryToken(User), useFactory: userRepositoryMockFactory},
//             ],
//         }).compile();
//         userRepository = module.get(getRepositoryToken(User));
//         userService = module.get(UserService);
//     })
//
//     it("Should create user entity", async () => {
//         let userDTO = new UserDTO("UserName", "password", "email", Role.ADMIN)
//         let serviceResponse = await userService.createUser(userDTO)
//         expect(serviceResponse.getStatus()).toBe(HttpStatus.OK)
//         expect(serviceResponse.getResponseObject()).toBe("User 'UserName' created successfuly")
//
//         expect(userRepository.create).toHaveBeenCalledTimes(1);
//         expect(userRepository.create).toHaveBeenCalledWith(userDTO);
//         expect(userRepository.save).toHaveBeenCalledTimes(1);
//     })
//
//     it("Should Update User password Test", async () => {
//         userRepository.findOne = jest.fn().mockImplementation((us) => {
//             let user = new User();
//             user.userName = us.userName;
//             user.password = encryptPasswordSync("oldPassword")
//             return Promise.resolve(user);
//         })
//         let serviceResponse = await userService.updatePassword("UserName", "oldPassword", "newPassword")
//         expect(serviceResponse.getStatus()).toBe(HttpStatus.OK)
//         expect(serviceResponse.getResponseObject()).toBe("User 'UserName' password updated successfuly")
//     })
//
//     // it("Should Update User Information Test", async () => {
//     //     let userDTO = new UserDTO("UserName", "password", "email", Role.ADMIN)
//     //     let userToUpdate = new UserDTO("UserNameUpdated", "passwordShouldNotUpdate", "email", Role.ADMIN, "FirstName", "LastName")
//     //     let updatedUser = await userService.updateUser(userToUpdate, createdUser.userName)
//     //     expect(updatedUser.userName).toBe("UserNameUpdated")
//     //     expect(updatedUser.password).toBe("password")
//     //     expect(updatedUser.role).toBe(Role.ADMIN)
//     //     expect(updatedUser.firstName).toBe("FirstName")
//     //     expect(updatedUser.lastName).toBe("LastName")
//     // })
// })