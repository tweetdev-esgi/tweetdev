"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const executeCode_1 = require("./executeCode");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.post('/api/executeCode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language } = req.body;
    if (!code || !language) {
        return res.status(400).json({ error: 'Code et langage requis.' });
    }
    try {
        const result = yield (0, executeCode_1.executeCode)(code, language);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
