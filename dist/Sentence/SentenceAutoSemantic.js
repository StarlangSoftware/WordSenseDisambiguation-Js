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
        /**
         * The method constructs all possible senses for the word at position index in the given sentence. The method checks
         * the previous two words and the current word; the previous, current and next word, current and the next
         * two words to add three word multiword sense (that occurs in the Turkish wordnet) to the result list. The
         * method then check the previous word and current word; current word and the next word to add a two word multiword
         * sense to the result list. Lastly, the method adds all possible senses of the current word to the result list.
         * @param wordNet Turkish wordnet
         * @param fsm Turkish morphological analyzer
         * @param sentence Sentence to be semantically disambiguated.
         * @param index Position of the word to be disambiguated.
         * @return All possible senses for the word at position index in the given sentence.
         */
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
        /**
         * The method tries to semantic annotate as many words in the sentence as possible.
         * @param sentence Sentence to be semantically disambiguated.
         */
        autoSemantic(sentence) {
            this.autoLabelSingleSemantics(sentence);
        }
    }
    exports.SentenceAutoSemantic = SentenceAutoSemantic;
});
//# sourceMappingURL=SentenceAutoSemantic.js.map