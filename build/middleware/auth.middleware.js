"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var validate = function (req, _res, next) {
    try {
        var auth = req.get('auth');
        if (auth) {
            var bearer = auth.split(' ')[0].toLowerCase();
            var token = auth.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    console.log("Error! .. ");
                    next();
                }
            }
        }
        else {
            next();
        }
    }
    catch (error) {
        throw error;
    }
};
exports.default = validate;
