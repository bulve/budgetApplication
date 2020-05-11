import {IServiceResponse, IUserPayload} from "../utils/interface";
import {ICategory, ICategoryCreateRequest, ICategorySuccess} from "./interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryEntity} from "./entity";
import {Injectable} from "@nestjs/common";
import {AccountService} from "../account";
import {ServiceResponseFactory} from "../utils/factory";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        private readonly accountService: AccountService,
    ){}

    public createCategory(userPayload: IUserPayload, categoryCreateRequest: ICategoryCreateRequest): Promise<IServiceResponse<ICategorySuccess>> {
        return this.accountService.getAccount(userPayload, categoryCreateRequest.accountId)
            .then(account => {
                if(account){
                    return this.categoryRepository.create({...categoryCreateRequest, userId: userPayload.userId})
                }
                throw Error(`Cannot create Category for Account id '${categoryCreateRequest.accountId}', as it does not exist`)
            })
            .then(category => this.categoryRepository.save(category))
            .then(category => ServiceResponseFactory.success({id: category.id}))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public getCategory(userPayload: IUserPayload, categoryId): Promise<IServiceResponse<ICategory>> {
        return this.categoryRepository.findOne({id: categoryId, userId: userPayload.userId})
            .then(category => ServiceResponseFactory.success(category))
            .catch(error => ServiceResponseFactory.failure(error.message))
    }

    public getAccountCategories(userPayload: IUserPayload, accountId): Promise<IServiceResponse<ICategory[]>> {
        return this.categoryRepository.find({accountId: accountId, userId: userPayload.userId})
            .then(categories => {
                if(categories){
                    ServiceResponseFactory.success(categories)
                }
                throw Error(`Cannot find Categories for Account id '${accountId}'`)
            })
            .catch(error => ServiceResponseFactory.failure(error.message))
    }
}