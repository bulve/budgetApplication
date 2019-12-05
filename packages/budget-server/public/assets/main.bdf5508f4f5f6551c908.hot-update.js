exports.id = "main";
exports.modules = {

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
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
const connection_module_1 = __webpack_require__(/*! ./connection/connection.module */ "./src/connection/connection.module.ts");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./src/user/user.module.ts");
const budget_module_1 = __webpack_require__(/*! ./budget/budget.module */ "./src/budget/budget.module.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const config_module_1 = __webpack_require__(/*! ./config/config.module */ "./src/config/config.module.ts");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [connection_module_1.ConnectionModule, config_module_1.ConfigModule, budget_module_1.BudgetModule, user_module_1.UserModule, auth_module_1.AuthModule],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;


/***/ }),

/***/ "./src/connection/connection.module.ts":
/*!*********************************************!*\
  !*** ./src/connection/connection.module.ts ***!
  \*********************************************/
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
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const budget_entity_1 = __webpack_require__(/*! ../budget/entity/budget.entity */ "./src/budget/entity/budget.entity.ts");
const action_entity_1 = __webpack_require__(/*! ../budget/entity/action.entity */ "./src/budget/entity/action.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../user/entity/user.entity */ "./src/user/entity/user.entity.ts");
let ConnectionModule = class ConnectionModule {
    configure(customer) { }
};
ConnectionModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync(useFactory, (configService) => __awaiter(void 0, void 0, void 0, function* () {
                return ({});
            })),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'samas1970',
                database: 'budget',
                entities: [budget_entity_1.Budget, action_entity_1.Action, user_entity_1.User],
                synchronize: true,
            })
        ],
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;


/***/ })

};
//# sourceMappingURL=main.bdf5508f4f5f6551c908.hot-update.js.map