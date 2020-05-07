import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity";
import { IUser, IUserRequest, IUserSuccess } from "./interface";
import {
    ServiceResponseFactory,
    IServiceResponse,
    encryptPassword,
    comparePasswordsSync,
    encryptPasswordSync
} from "../utils";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        ){}

    async createUser(userRequest: IUserRequest): Promise<IServiceResponse<IUserSuccess>> {
        return await encryptPassword(userRequest.password)
            .then(encrypted => {
                return {
                    password: encrypted,
                    email: userRequest.email,
                    timestamp: Date.now().toString()
                };
            })
            .then(user => this.userRepository.create(user))
            .then(user => this.saveUser(user))
            .then(user => ServiceResponseFactory.success({email: user.email}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    async updateUser(userRequest: IUserRequest, email: string): Promise<IServiceResponse<IUserSuccess>> {
        return await this.userRepository.findOne({email})
            .then(user => {
                if(user){
                    return user;
                }
                throw Error(`User '${email}' does not exist.`)
            })
            .then(user => ServiceResponseFactory.success({email: user.email}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<IServiceResponse<IUserSuccess>> {
        return this.userRepository.findOne({email})
            .then(user => {
                if(user){
                    if(comparePasswordsSync(oldPassword, user.password)){
                        user.password = encryptPasswordSync(newPassword);
                        return user;
                    }
                    throw Error(`User '${email}' provided wrong password, please try again.`)
                }
                throw Error(`User '${email}' does not exist.`)
            })
            .then(user => ServiceResponseFactory.success({email: user.email}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    async getUser(email: string): Promise<IUser> {
        return this.userRepository.findOne({email})
    }

    async getUsers(): Promise<IUser[]> {
        return this.userRepository.find(); 
    }

    private saveUser(user: UserEntity): Promise<IUser> {
        return this.userRepository.save(user);
    }
    
}