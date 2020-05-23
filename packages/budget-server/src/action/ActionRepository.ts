import {InjectRepository} from "@nestjs/typeorm";
import {ActionEntity} from "./entity";
import {Repository} from "typeorm";
import {IAction, IActionPerform} from "./interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ActionRepository {
    constructor(@InjectRepository(ActionEntity) private readonly repository: Repository<ActionEntity>) {
    }

    public create(action: IActionPerform): IAction {
        return this.repository.create(action)
    }

    public save(action: IActionPerform): Promise<IAction> {
        return this.repository.save(action)
    }

    public get(actionId: string): Promise<IAction | undefined> {
        return this.repository.findOne(actionId)
    }

    public getAll(accountId: string) : Promise<IAction[]> {
        return this.repository.find({accountId: accountId})
    }
}