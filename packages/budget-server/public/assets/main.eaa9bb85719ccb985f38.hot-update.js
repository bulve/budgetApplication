exports.id = "main";
exports.modules = {

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
const config_service_1 = __webpack_require__(/*! ../config/config.service */ "./src/config/config.service.ts");
let ConnectionModule = class ConnectionModule {
    configure(customer) { }
};
ConnectionModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        type: configService.get("DATABASE_TYPE"),
                        host: configService.get("DATABASE_HOST"),
                        port: Number(configService.get("DATABASE_PORT")),
                        username: configService.get("DATABASE_USERNAME"),
                        password: configService.get("DATABASE_PASSWORD"),
                        database: configService.get("DATABASE_NAME"),
                        entities: [budget_entity_1.Budget, action_entity_1.Action, user_entity_1.User],
                        synchronize: true
                    });
                }),
                inject: [config_service_1.ConfigService],
            })
        ],
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;


/***/ })

};
//# sourceMappingURL=main.eaa9bb85719ccb985f38.hot-update.js.map