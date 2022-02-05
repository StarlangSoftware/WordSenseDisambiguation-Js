(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SentenceAutoSemantic", "nlptoolkit-util/dist/Random"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomSentenceAutoSemantic = void 0;
    const SentenceAutoSemantic_1 = require("./SentenceAutoSemantic");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    class RandomSentenceAutoSemantic extends SentenceAutoSemantic_1.SentenceAutoSemantic {
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        autoLabelSingleSemantics(sentence) {
            let random = new Random_1.Random(1);
            for (let i = 0; i < sentence.wordCount(); i++) {
                let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
                if (synSets.length > 0) {
                    sentence.getWord(i).setSemantic(synSets[random.nextInt(synSets.length)].getId());
                }
            }
            return true;
        }
    }
    exports.RandomSentenceAutoSemantic = RandomSentenceAutoSemantic;
});
//# sourceMappingURL=RandomSentenceAutoSemantic.js.map