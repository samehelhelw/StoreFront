"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var PORT = config_1.default.port || 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(PORT, function () { return console.log("app listening on port http://localhost:".concat(PORT, " !")); });
app.use(function (req, res) {
    res.status(404).send('Not found');
});
exports.default = app;
