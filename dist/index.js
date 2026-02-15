"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./AutoProcessor/AutoSemantic"), exports);
__exportStar(require("./AutoProcessor/ParseTree/ParseTreeLesk"), exports);
__exportStar(require("./AutoProcessor/ParseTree/MostFrequentTreeAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/ParseTree/RandomTreeAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/ParseTree/TreeAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/ParseTree/TurkishTreeAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/Sentence/SentenceLesk"), exports);
__exportStar(require("./AutoProcessor/Sentence/MostFrequentSentenceAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/Sentence/RandomSentenceAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/Sentence/SentenceAutoSemantic"), exports);
__exportStar(require("./AutoProcessor/Sentence/TurkishSentenceAutoSemantic"), exports);
//# sourceMappingURL=index.js.map