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


/***/ })

};
//# sourceMappingURL=main.5f090e76fb911981aa1e.hot-update.js.map