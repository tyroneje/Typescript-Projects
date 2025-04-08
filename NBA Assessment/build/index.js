"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("@dotenvx/dotenvx/config");
const DraftHandler_1 = __importDefault(require("./handlers/DraftHandler"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.get('/draftpicks/:id', (_req, _res) => new DraftHandler_1.default().Handle(_req, _res));
// Server setup
app.listen(3000, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});
