"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Subscription Tracker API" });
});
app.listen(3000, "localhost", () => {
    console.log(`Subscription Tracker API is running at http://localhost:3000`);
});
exports.default = app;
//# sourceMappingURL=app.js.map