(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoSemantic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MostFrequentSentenceAutoSemantic = void 0;
    const SentenceAutoSemantic_1 = require("./SentenceAutoSemantic");
    class MostFrequentSentenceAutoSemantic extends SentenceAutoSemantic_1.SentenceAutoSemantic {
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        autoLabelSingleSemantics(sentence) {
            for (let i = 0; i < sentence.wordCount(); i++) {
                let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
                if (synSets.length > 0) {
                    let best = this.mostFrequent(synSets, sentence.getWord(i).getParse().getWord().getName());
                    if (best != null) {
                        sentence.getWord(i).setSemantic(best.getId());
                    }
                }
            }
            return true;
        }
    }
    exports.MostFrequentSentenceAutoSemantic = MostFrequentSentenceAutoSemantic;
});
//# sourceMappingURL=MostFrequentSentenceAutoSemantic.js.map