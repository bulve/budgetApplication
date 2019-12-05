exports.id = "main";
exports.modules = {

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
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
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_entity_1 = __webpack_require__(/*! ../user/entity/user.entity */ "./src/user/entity/user.entity.ts");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./src/user/user.service.ts");
const login_entity_1 = __webpack_require__(/*! ./entity/login.entity */ "./src/auth/entity/login.entity.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login(res, loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginResponse = yield this.authService.login(loginRequest);
            res.status(loginResponse.getStatus()).json(loginResponse.getResponseObject());
        });
    }
    register(res, userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.userService.createUser(userDTO);
            res.status(response.getStatus()).json(response.getResponseObject());
        });
    }
    users(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUsers();
        });
    }
};
__decorate([
    common_1.Post("login"),
    __param(0, common_1.Res()), __param(1, common_1.Body("login")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_entity_1.LoginRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post("register"),
    __param(0, common_1.Res()), __param(1, common_1.Body("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get("users"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "users", null);
AuthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;


/***/ })

};
//# sourceMappingURL=main.37d019f389d8751745d7.hot-update.js.map