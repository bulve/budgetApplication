import {CategoryService} from "./CategoryService";
import {Controller} from "@nestjs/common";

@Controller("/api/category")
export class CategoryController {
    constructor(private readonly accountService: CategoryService){}
}