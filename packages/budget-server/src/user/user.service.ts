import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserDTO } from "./entity/user.entity";
import { encryptPassword, comparePasswordsSync, encryptPasswordSync } from "../utils/password/pasword.hashing.service";
import { ServiceResponseFactory, ServiceResponse } from "../utils/entity/response.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        ){}

    async createUser(userDTO: UserDTO): Promise<ServiceResponseFactory<string>> {
        return await encryptPassword(userDTO.password)
            .then(encrypted => {
                userDTO.password = encrypted
                return userDTO;
            })
            .then(user => this.userRepository.create(user))
            .then(user => this.saveUser(user))
            .then(user => ServiceResponseFactory.successWith(`User '${user.userName}' created successfuly`))
            .catch(error => ServiceResponseFactory.failureWith(error.message))
    }

    async updateUser(userDTO: UserDTO, userName: string): Promise<ServiceResponse> {
        return await this.userRepository.findOne({userName})
            .then(user => {
                if(user){
                    user.firstName = userDTO.firstName
                    user.lastName = userDTO.lastName
                    user.userName = userDTO.userName
                    return user;
                }
                throw Error(`User '${userName}' does not exist.`)
            })
            .then(user => ServiceResponseFactory.successWith(`User '${user.userName}' updated successfuly`))
            .catch(error => ServiceResponseFactory.failureWith(error.message))
    }

    async updatePassword(userName: string, oldPassword: string, newPassword: string): Promise<ServiceResponse> {
        return this.userRepository.findOne({userName})
            .then(user => {
                if(user){
                    if(comparePasswordsSync(oldPassword, user.password)){
                        user.password = encryptPasswordSync(newPassword);;
                        return user;
                    }
                    throw Error(`User '${userName}' provided wrong password, please try again.`) 
                }
                throw Error(`User '${userName}' does not exist.`) 
            })
            .then(user => ServiceResponseFactory.successWith(`User '${user.userName}' password updated successfuly`))
            .catch(error => ServiceResponseFactory.failureWith(error.message))
    }

    async getUser(userName: string): Promise<User> {
        return this.userRepository.findOne({userName})
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find(); 
    }

    private saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
    
}