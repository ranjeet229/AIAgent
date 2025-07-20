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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAgent = exports.initAgent = void 0;
const ingest_1 = require("./ingest");
const openai_1 = require("@langchain/openai");
const chains_1 = require("langchain/chains");
let qaChain;
const initAgent = () => __awaiter(void 0, void 0, void 0, function* () {
    const vectorstore = yield (0, ingest_1.embedPdf)();
    //RAG
    const retriever = vectorstore.asRetriever();
    //choose model
    const model = new openai_1.ChatOpenAI({
        modelName: "gpt-4o",
        temperature: 0 //kitna jaldi response chahiye
    });
    qaChain = chains_1.RetrievalQAChain.fromLLM(model, retriever);
});
exports.initAgent = initAgent;
const askAgent = (question) => __awaiter(void 0, void 0, void 0, function* () {
    if (!qaChain) {
        throw new Error("Agent not initialized. Please call initAgent first.");
    }
    const res = yield qaChain.invoke({ query: question });
    return res.text;
});
exports.askAgent = askAgent;
