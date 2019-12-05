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

/***/ "./src/config/config.service.ts":
/*!**************************************!*\
  !*** ./src/config/config.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;


/***/ })

};
//# sourceMappingURL=main.fa3badb0817c8c444b5a.hot-update.js.map