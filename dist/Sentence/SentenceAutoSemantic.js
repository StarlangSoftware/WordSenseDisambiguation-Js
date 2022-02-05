(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../AutoSemantic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentenceAutoSemantic = void 0;
    const AutoSemantic_1 = require("../AutoSemantic");
    class SentenceAutoSemantic extends AutoSemantic_1.AutoSemantic {
        getCandidateSynSets(wordNet, fsm, sentence, index) {
            let twoPrevious = null, previous = null, current, twoNext = null, next = null;
            current = sentence.getWord(index);
            if (index > 1) {
                twoPrevious = sentence.getWord(index - 2);
            }
            if (index > 0) {
                previous = sentence.getWord(index - 1);
            }
            if (index != sentence.wordCount() - 1) {
                next = sentence.getWord(index + 1);
            }
            if (index < sentence.wordCount() - 2) {
                twoNext = sentence.getWord(index + 2);
            }
            let synSets = wordNet.constructSynSets(current.getParse().getWord().getName(), current.getParse(), current.getMetamorphicParse(), fsm);
            if (twoPrevious != null && twoPrevious.getParse() != null && previous.getParse() != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, twoPrevious.getParse(), twoPrevious.getMetamorphicParse(), previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse()));
            }
            if (previous != null && previous.getParse() != null && next != null && next.getParse() != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse()));
            }
            if (next != null && next.getParse() != null && twoNext != null && twoNext.getParse() != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse(), twoNext.getParse(), twoNext.getMetamorphicParse()));
            }
            if (previous != null && previous.getParse() != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse()));
            }
            if (next != null && next.getParse() != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse()));
            }
            return synSets;
        }
        autoSemantic(sentence) {
            this.autoLabelSingleSemantics(sentence);
        }
    }
    exports.SentenceAutoSemantic = SentenceAutoSemantic;
});
//# sourceMappingURL=SentenceAutoSemantic.js.map