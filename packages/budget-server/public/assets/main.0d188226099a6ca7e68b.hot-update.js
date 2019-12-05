exports.id = "main";
exports.modules = {

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
const budget_entity_1 = __webpack_require__(/*! ./enity/budget.entity */ "./src/budget/enity/budget.entity.ts");
const action_entity_1 = __webpack_require__(/*! ./enity/action.entity */ "./src/budget/enity/action.entity.ts");
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
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (65:25)\nYou may need an appropriate loader to handle this file type.\n|                 }\r\n|                 else {\r\n>                     throw;\r\n|                 }\r\n|             });\r");

/***/ })

};
//# sourceMappingURL=main.0d188226099a6ca7e68b.hot-update.js.map