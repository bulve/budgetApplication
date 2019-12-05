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
const budget_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './budget'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let BudgetModule = class BudgetModule {
    configure(customer) { }
};
BudgetModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([budget_entity_1.Budget, action_entity_1.Action])
        ],
        controllers: [budget_controller_1.BudgetController],
        providers: [budget_1.BudgetService]
    })
], BudgetModule);
exports.BudgetModule = BudgetModule;


/***/ }),

/***/ "./src/budget/budget.service.ts":
false

};
//# sourceMappingURL=main.bbbd1aeeb62b41d03fb9.hot-update.js.map