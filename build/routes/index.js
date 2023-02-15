"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_routes_1 = __importDefault(require("./api/user.routes"));
var product_routes_1 = __importDefault(require("./api/product.routes"));
var order_routes_1 = __importDefault(require("./api/order.routes"));
var router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/products', product_routes_1.default);
router.use('/orders', order_routes_1.default);
exports.default = router;
