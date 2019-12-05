exports.id = "main";
exports.modules = {

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
const pasword_hashing_service_1 = __webpack_require__(/*! ../utils/pasword.hashing.service */ "./src/utils/pasword.hashing.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const response_entity_1 = __webpack_require__(/*! ../utils/response.entity */ "./src/utils/response.entity.ts");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(loginRequest && loginRequest.userName && loginRequest.password)) {
                return response_entity_1.ResponseEntity.failureWithMessage("Username and password are required!");
            }
            return this.userService.getUser(loginRequest.userName)
                .then(user => {
                if (user) {
                    if (pasword_hashing_service_1.comparePasswordsSync(loginRequest.password, user.password)) {
                        let payload = { userName: user.userName, sub: user.id };
                        return response_entity_1.ResponseEntity.successWithAny({ access_token: this.jwtService.sign(payload) });
                    }
                    return response_entity_1.ResponseEntity.failureWithMessage(`Provided User '${user.userName}' password is incorect, please try again`);
                }
                return response_entity_1.ResponseEntity.failureWithMessage(`User '${loginRequest.userName}' not found`);
            });
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
const budget_entity_1 = __webpack_require__(/*! ./enity/budget.entity */ "./src/budget/enity/budget.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const action_entity_1 = __webpack_require__(/*! ./enity/action.entity */ "./src/budget/enity/action.entity.ts");
const response_entity_1 = __webpack_require__(/*! ../utils/response.entity */ "./src/utils/response.entity.ts");
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
            let createdBudget = yield this.budgetRepository.save(budget);
            if (createdBudget) {
                return response_entity_1.ResponseEntityFor.successWith(`Budget created succesfuly`);
            }
            else {
                return response_entity_1.ResponseEntityFor.failureWith(`Budget was not created`);
            }
        });
    }
    getBudgets(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            let bugets = yield this.getBudgetsByUserId(userPayload.userId);
            return response_entity_1.ResponseEntityFor.successWith(bugets);
        });
    }
    getBudgetsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.budgetRepository.find({ userId });
        });
    }
    performAction(userPayload, actionDTO, budgetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let userBudgets = yield this.getBudgetsByUserId(userPayload.userId);
            if (userBudgets.length === 0) {
                return response_entity_1.ResponseEntityFor.failureWith(`User does not have Budgets`);
            }
            let budgetsById = userBudgets.filter(budget => budget.id === budgetId);
            if (budgetsById.length === 0) {
                return response_entity_1.ResponseEntityFor.failureWith(`User does not have Budget by id '${budgetId}'`);
            }
            let budget = budgetsById[0];
            let action = this.actionRepository.create(actionDTO);
            action.budgetId = budgetId;
            action.timeStamp = new Date();
            if (action.type === action_entity_1.ActionType.WITHDRAW) {
                if (budget.balance >= action.amount && action.amount >= 0) {
                    budget.balance -= action.amount;
                    let savedAction = yield this.saveAction(action);
                    let savedBudget = yield this.saveBudget(budget);
                    if (savedAction && savedBudget) {
                        return response_entity_1.ResponseEntityFor.successWith(`Action '${savedAction.type}' for amount '${savedAction.amount}' for Budget '${savedBudget.id}' was perfomed succesfuly`);
                    }
                    else {
                        return response_entity_1.ResponseEntityFor.failureWith(`Action '${savedAction.type}' for amount '${savedAction.amount}' for Budget '${savedBudget.id}' was not perfomed`);
                    }
                }
                return response_entity_1.ResponseEntityFor.failureWith("Invalid request. Can not WITHDRAW more than have or negative amount");
            }
            else if (action.type == action_entity_1.ActionType.DEPOSIT) {
                if (action.amount > 0) {
                    budget.balance += action.amount;
                    let savedAction = yield this.saveAction(action);
                    let savedBudget = yield this.saveBudget(budget);
                    if (savedAction && savedBudget) {
                        return response_entity_1.ResponseEntityFor.successWith(`Action '${savedAction.type}' for amount '${savedAction.amount}' for Budget '${savedBudget.id}' was perfomed succesfuly`);
                    }
                    else {
                        return response_entity_1.ResponseEntityFor.failureWith(`Action '${savedAction.type}' for amount '${savedAction.amount}' for Budget '${savedBudget.id}' was not perfomed`);
                    }
                }
                return response_entity_1.ResponseEntityFor.failureWith("Invalid request. Can not DEPOSITO negative amount");
            }
            return response_entity_1.ResponseEntityFor.failureWith("Invalid request");
        });
    }
    saveBudget(budget) {
        return this.budgetRepository.save(budget);
    }
    saveAction(action) {
        return this.actionRepository.save(action);
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
const pasword_hashing_service_1 = __webpack_require__(/*! ../utils/pasword.hashing.service */ "./src/utils/pasword.hashing.service.ts");
const response_entity_1 = __webpack_require__(/*! ../utils/response.entity */ "./src/utils/response.entity.ts");
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
                .then(user => response_entity_1.ResponseEntityFor.successWith(`User '${user.userName}' created successfuly`));
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
                    return response_entity_1.ResponseEntity.successWithMessage(`User '${userName}' updated successfuly`);
                }
                return response_entity_1.ResponseEntity.failureWithMessage(`User '${userName}' does not exist.`);
            });
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
                        return response_entity_1.ResponseEntity.successWithMessage(`User '${userName}' password updated successfuly`);
                    }
                    return response_entity_1.ResponseEntity.failureWithMessage(`User '${userName}' provided wrong password, please try again.`);
                }
                return response_entity_1.ResponseEntity.failureWithMessage(`User '${userName}' does not exist.`);
            });
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

/***/ "./src/utils/response.entity.ts":
/*!**************************************!*\
  !*** ./src/utils/response.entity.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class LoginRequest {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}
exports.LoginRequest = LoginRequest;
class ResponseEntity {
    static failureWithMessage(message) {
        let response = new ResponseEntity();
        response.httpStatus = common_1.HttpStatus.FORBIDDEN;
        response.responseObject = { message };
        return response;
    }
    static successWithMessage(message) {
        let response = new ResponseEntity();
        response.httpStatus = common_1.HttpStatus.OK;
        response.responseObject = { message };
        return response;
    }
    static successWithAny(responseObject) {
        let response = new ResponseEntity();
        response.httpStatus = common_1.HttpStatus.OK;
        response.responseObject = responseObject;
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
class ResponseEntityFor {
    static failureWith(t) {
        let response = new ResponseEntityFor();
        response.httpStatus = common_1.HttpStatus.FORBIDDEN;
        response.responseObject = t;
        return response;
    }
    static successWith(t) {
        let response = new ResponseEntityFor();
        response.httpStatus = common_1.HttpStatus.OK;
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
exports.ResponseEntityFor = ResponseEntityFor;


/***/ })

};
//# sourceMappingURL=main.ed031701036a7d71aacf.hot-update.js.map