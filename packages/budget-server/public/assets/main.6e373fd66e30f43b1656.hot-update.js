exports.id = "main";
exports.modules = {

/***/ "./src/budget/enity/budget.entity.ts":
/*!*******************************************!*\
  !*** ./src/budget/enity/budget.entity.ts ***!
  \*******************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Budget = class Budget {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Budget.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Budget.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Budget.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({
        type: "double",
        default: 0
    }),
    __metadata("design:type", Number)
], Budget.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({
        type: "datetime",
        default: new Date()
    }),
    __metadata("design:type", Date)
], Budget.prototype, "openDate", void 0);
Budget = __decorate([
    typeorm_1.Entity()
], Budget);
exports.Budget = Budget;
class BudgetDTO {
    constructor(name, balance, openDate) {
        this.name = name;
        this.balance = balance;
        this.openDate = openDate;
    }
}
exports.BudgetDTO = BudgetDTO;


/***/ })

};
//# sourceMappingURL=main.6e373fd66e30f43b1656.hot-update.js.map