import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "./entity";
import {IAccount, IAccountRequest} from "./interface";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AccountRepository {

    constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {
    }

    public create(account: IAccountRequest): IAccount {
        return this.accountRepository.create(account);
    }

    public save(account: IAccountRequest): Promise<IAccount> {
        return this.accountRepository.save(account);
    }

    public getOne(accountId: string, userId?: string): Promise<IAccount | undefined> {
        if(userId) {
            return this.accountRepository.findOne({id:accountId, userId: userId})
        }
        return this.accountRepository.findOne(accountId)
    }

    public getAll(userId: string):  Promise<IAccount[]> {
        return this.accountRepository.find({userId})
    }

}