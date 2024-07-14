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
        /**
         * Constructor for the {@link RandomSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
         * morphological analyzer from the user and sets the corresponding attributes.
         * @param turkishWordNet Turkish wordnet
         * @param fsm Turkish morphological analyzer
         */
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        /**
         * The method annotates the word senses of the words in the sentence randomly. The algorithm processes target
         * words one by one. First, the algorithm constructs an array of all possible senses for the target word to
         * annotate. Then it chooses a sense randomly.
         * @param sentence Sentence to be annotated.
         * @return True.
         */
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