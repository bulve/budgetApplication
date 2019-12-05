exports.id = "main";
exports.modules = {

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
//# sourceMappingURL=main.85647baccc94a7574c52.hot-update.js.map