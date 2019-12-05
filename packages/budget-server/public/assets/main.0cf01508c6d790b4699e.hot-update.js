exports.id = "main";
exports.modules = {

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const user_module_1 = __webpack_require__(/*! ../user/user.module */ "./src/user/user.module.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/auth/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./jwt.strategy */ "./src/auth/jwt.strategy.ts");
const config_service_1 = __webpack_require__(/*! ../config/config.service */ "./src/config/config.service.ts");
let AuthModule = class AuthModule {
    configure(customer) {
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        secret: configService.get('SECRET_KEY'),
                        signOptions: { expiresIn: "1d" }
                    });
                }),
                inject: [config_service_1.ConfigService],
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
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
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./src/user/user.service.ts");
const pasword_hashing_service_1 = __webpack_require__(/*! ../utils/password/pasword.hashing.service */ "./src/utils/password/pasword.hashing.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const response_entity_1 = __webpack_require__(/*! ../utils/entity/response.entity */ "./src/utils/entity/response.entity.ts");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(loginRequest && loginRequest.userName && loginRequest.password)) {
                return response_entity_1.ResponseEntity.failureWith("Username and password are required!");
            }
            return this.userService.getUser(loginRequest.userName)
                .then(user => {
                if (user) {
                    if (pasword_hashing_service_1.comparePasswordsSync(loginRequest.password, user.password)) {
                        return { userName: user.userName, sub: user.id };
                    }
                    throw Error(`Provided User '${user.userName}' password is incorect, please try again`);
                }
                throw Error(`User '${loginRequest.userName}' not found`);
            })
                .then(payload => response_entity_1.ResponseEntity.successWith({ access_token: this.jwtService.sign(payload) }))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

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
                .then(createdBudget => response_entity_1.ResponseEntity.successWith(`Budget with name '${createdBudget.name}' was created succesfuly`))
                .catch(error => response_entity_1.ResponseEntity.failureWith(`Failed to create budget with error: '${error}'`));
        });
    }
    getBudgets(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getBudgetsByUserId(userPayload.userId)
                .then(budgets => response_entity_1.ResponseEntity.successWith(budgets))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
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
                .then(action => response_entity_1.ResponseEntity.successWith(`Action '${action.type}' for '${action.amount}' where perfomed on Budget by id '${budgetId}'`))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
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
            .then(actions => response_entity_1.ResponseEntity.successWith(actions))
            .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
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


/***/ }),

/***/ "./src/user/user.module.ts":
/*!*********************************!*\
  !*** ./src/user/user.module.ts ***!
  \*********************************/
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
const user_entity_1 = __webpack_require__(/*! ./entity/user.entity */ "./src/user/entity/user.entity.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/user/user.service.ts");
let UserModule = class UserModule {
    configure(customer) {
    }
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])
        ],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./src/user/user.service.ts":
/*!**********************************!*\
  !*** ./src/user/user.service.ts ***!
  \**********************************/
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
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./entity/user.entity */ "./src/user/entity/user.entity.ts");
const pasword_hashing_service_1 = __webpack_require__(/*! ../utils/password/pasword.hashing.service */ "./src/utils/password/pasword.hashing.service.ts");
const response_entity_1 = __webpack_require__(/*! ../utils/entity/response.entity */ "./src/utils/entity/response.entity.ts");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pasword_hashing_service_1.encryptPassword(userDTO.password)
                .then(encrypted => {
                userDTO.password = encrypted;
                return userDTO;
            })
                .then(user => this.userRepository.create(user))
                .then(user => this.saveUser(user))
                .then(user => response_entity_1.ResponseEntity.successWith(`User '${user.userName}' created successfuly`))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
        });
    }
    updateUser(userDTO, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ userName })
                .then(user => {
                if (user) {
                    user.firstName = userDTO.firstName;
                    user.lastName = userDTO.lastName;
                    user.userName = userDTO.userName;
                    return user;
                }
                throw Error(`User '${userName}' does not exist.`);
            })
                .then(user => response_entity_1.ResponseEntity.successWith(`User '${user.userName}' updated successfuly`))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
        });
    }
    updatePassword(userName, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ userName })
                .then(user => {
                if (user) {
                    if (pasword_hashing_service_1.comparePasswordsSync(oldPassword, user.password)) {
                        user.password = pasword_hashing_service_1.encryptPasswordSync(newPassword);
                        ;
                        return user;
                    }
                    throw Error(`User '${userName}' provided wrong password, please try again.`);
                }
                throw Error(`User '${userName}' does not exist.`);
            })
                .then(user => response_entity_1.ResponseEntity.successWith(`User '${user.userName}' password updated successfuly`))
                .catch(error => response_entity_1.ResponseEntity.failureWith(error.message));
        });
    }
    getUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ userName });
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    saveUser(user) {
        return this.userRepository.save(user);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./src/utils/entity/response.entity.ts":
/*!*********************************************!*\
  !*** ./src/utils/entity/response.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class ResponseEntity {
    static failureWith(t) {
        let response = new ResponseEntity();
        response.httpStatus = common_1.HttpStatus.FORBIDDEN;
        response.responseObject = t;
        return response;
    }
    static successWith(t) {
        let response = new ResponseEntity();
        response.httpStatus = common_1.HttpStatus.OK;
        response.responseObject = t;
        return response;
    }
    static with(httpStatus, t) {
        let response = new ResponseEntity();
        response.httpStatus = httpStatus;
        response.responseObject = t;
        return response;
    }
    getStatus() {
        return this.httpStatus;
    }
    getResponseObject() {
        return this.responseObject;
    }
}
exports.ResponseEntity = ResponseEntity;


/***/ })

};
//# sourceMappingURL=main.0cf01508c6d790b4699e.hot-update.js.map