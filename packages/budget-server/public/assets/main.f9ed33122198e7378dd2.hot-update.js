exports.id = "main";
exports.modules = {

/***/ "./src/budget/budget.controller.ts":
/*!*****************************************!*\
  !*** ./src/budget/budget.controller.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const budget_service_1 = __webpack_require__(/*! ./budget.service */ "./src/budget/budget.service.ts");
const budget_entity_1 = __webpack_require__(/*! ./entity/budget.entity */ "./src/budget/entity/budget.entity.ts");
const action_entity_1 = __webpack_require__(/*! ./entity/action.entity */ "./src/budget/entity/action.entity.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let BudgetController = class BudgetController {
    constructor(budgetService) {
        this.budgetService = budgetService;
    }
    createBudget(res, req, budget) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseEntity = yield this.budgetService.createBudget(req.user, budget);
            res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject());
        });
    }
    getBudgets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseEntity = yield this.budgetService.getBudgets(req.user);
            res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject());
        });
    }
    getActions(req, res, budgetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseEntity = yield this.budgetService.getActions(req.user, budgetId);
            res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject());
        });
    }
    perfomAction(req, res, budgetId, actionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseEntity = yield this.budgetService.performAction(req.user, actionDTO, budgetId);
            res.status(responseEntity.getStatus()).json(responseEntity.getResponseObject());
        });
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post("/new"),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Body("budget")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, budget_entity_1.BudgetDTO]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "createBudget", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "getBudgets", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    common_1.Get("/action/:budgetId"),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param("budgetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "getActions", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard("jwt")),
    common_1.Post("/action/:budgetId"),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param("budgetId")), __param(3, common_1.Body("action")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, action_entity_1.ActionDTO]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "perfomAction", null);
BudgetController = __decorate([
    common_1.Controller("/api/budget"),
    __metadata("design:paramtypes", [budget_service_1.BudgetService])
], BudgetController);
exports.BudgetController = BudgetController;


/***/ }),

/***/ "./src/budget/budget.module.ts":
/*!*************************************!*\
  !*** ./src/budget/budget.module.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const budget_entity_1 = __webpack_require__(/*! ./entity/budget.entity */ "./src/budget/entity/budget.entity.ts");
const action_entity_1 = __webpack_require__(/*! ./entity/action.entity */ "./src/budget/entity/action.entity.ts");
const budget_controller_1 = __webpack_require__(/*! ./budget.controller */ "./src/budget/budget.controller.ts");
const budget_service_1 = __webpack_require__(/*! ./budget.service */ "./src/budget/budget.service.ts");
let BudgetModule = class BudgetModule {
    configure(customer) { }
};
BudgetModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([budget_entity_1.Budget, action_entity_1.Action])
        ],
        controllers: [budget_controller_1.BudgetController],
        providers: [budget_service_1.BudgetService]
    })
], BudgetModule);
exports.BudgetModule = BudgetModule;


/***/ }),

/***/ "./src/budget/budget.service.ts":
/*!**************************************!*\
  !*** ./src/budget/budget.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const budget_entity_1 = __webpack_require__(/*! ./entity/budget.entity */ "./src/budget/entity/budget.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const action_entity_1 = __webpack_require__(/*! ./entity/action.entity */ "./src/budget/entity/action.entity.ts");
const response_entity_1 = __webpack_require__(/*! ../utils/entity/response.entity */ "./src/utils/entity/response.entity.ts");
let BudgetService = class BudgetService {
    constructor(budgetRepository, actionRepository) {
        this.budgetRepository = budgetRepository;
        this.actionRepository = actionRepository;
    }
    createBudget(userPayload, budgetDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const budget = this.budgetRepository.create(budgetDTO);
            budget.userId = userPayload.userId;
            budget.openDate = budget.openDate ? budget.openDate : new Date();
            return this.budgetRepository.save(budget)
                .then(createdBudget => response_entity_1.ServiceResponseFactory.successWith(`Budget with name '${createdBudget.name}' was created succesfuly`))
                .catch(error => response_entity_1.ServiceResponseFactory.failureWith(`Failed to create budget with error: '${error}'`));
        });
    }
    getBudgets(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getBudgetsByUserId(userPayload.userId)
                .then(budgets => response_entity_1.ServiceResponseFactory.successWith(budgets))
                .catch(error => response_entity_1.ServiceResponseFactory.failureWith(error.message));
        });
    }
    performAction(userPayload, actionDTO, budgetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let action = this.actionRepository.create(actionDTO);
            action.budgetId = budgetId;
            action.timeStamp = new Date();
            return this.budgetRepository.findOne(budgetId)
                .then(budget => {
                if (budget.userId == userPayload.userId) {
                    return budget;
                }
                else {
                    throw Error(`User does not have Budget by id '${budgetId}' and cannot perform actions`);
                }
            })
                .then(budget => {
                if (this.canActionBePerfomed(action, budget)) {
                    return this.performeAction(action, budget);
                }
                else {
                    throw Error(`Action '${action.type}' cannot be perfomed to Budget '${budget.name}'`);
                }
            })
                .then(budget => this.saveBudget(budget))
                .then(budget => this.saveAction(action))
                .then(action => response_entity_1.ServiceResponseFactory.successWith(`Action '${action.type}' for '${action.amount}' where perfomed on Budget by id '${budgetId}'`))
                .catch(error => response_entity_1.ServiceResponseFactory.failureWith(error.message));
        });
    }
    getActions(userPayload, budgetId) {
        return this.budgetRepository.findOne(budgetId)
            .then(budget => {
            if (budget.userId == userPayload.userId) {
                return budget;
            }
            else {
                throw Error(`User does not have Budget by id '${budgetId}' and cannot review it actions`);
            }
        })
            .then(budget => this.actionRepository.find({ budgetId }))
            .then(actions => response_entity_1.ServiceResponseFactory.successWith(actions))
            .catch(error => response_entity_1.ServiceResponseFactory.failureWith(error.message));
    }
    getBudgetsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.budgetRepository.find({ userId });
        });
    }
    saveBudget(budget) {
        return this.budgetRepository.save(budget);
    }
    saveAction(action) {
        return this.actionRepository.save(action);
    }
    canActionBePerfomed(action, budget) {
        if (action.type === action_entity_1.ActionType.WITHDRAW) {
            return budget.balance >= action.amount && action.amount >= 0;
        }
        else if (action.type == action_entity_1.ActionType.DEPOSIT) {
            return action.amount > 0;
        }
        return false;
    }
    performeAction(action, budget) {
        if (action.type === action_entity_1.ActionType.WITHDRAW) {
            budget.balance = budget.balance - action.amount;
            return budget;
        }
        else if (action.type == action_entity_1.ActionType.DEPOSIT) {
            budget.balance = budget.balance + action.amount;
            return budget;
        }
        return budget;
    }
};
BudgetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(budget_entity_1.Budget)),
    __param(1, typeorm_1.InjectRepository(action_entity_1.Action)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BudgetService);
exports.BudgetService = BudgetService;


/***/ })

};
//# sourceMappingURL=main.f9ed33122198e7378dd2.hot-update.js.map