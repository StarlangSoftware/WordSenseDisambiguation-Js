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
    exports.Lesk = void 0;
    const SentenceAutoSemantic_1 = require("./SentenceAutoSemantic");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    class Lesk extends SentenceAutoSemantic_1.SentenceAutoSemantic {
        /**
         * Constructor for the {@link Lesk} class. Gets the Turkish wordnet and Turkish fst based
         * morphological analyzer from the user and sets the corresponding attributes.
         * @param turkishWordNet Turkish wordnet
         * @param fsm Turkish morphological analyzer
         */
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        intersection(synSet, sentence) {
            let words1;
            if (synSet.getExample() != null) {
                words1 = (synSet.getLongDefinition() + " " + synSet.getExample()).split(" ");
            }
            else {
                words1 = synSet.getLongDefinition().split(" ");
            }
            let words2 = sentence.toWords().split(" ");
            let count = 0;
            for (let word1 of words1) {
                for (let word2 of words2) {
                    if (word1.toLocaleLowerCase("tr") == word2.toLocaleLowerCase("tr")) {
                        count++;
                    }
                }
            }
            return count;
        }
        autoLabelSingleSemantics(sentence) {
            let random = new Random_1.Random(1);
            let done = false;
            for (let i = 0; i < sentence.wordCount(); i++) {
                let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
                let maxIntersection = -1;
                for (let j = 0; j < synSets.length; j++) {
                    let synSet = synSets[j];
                    let intersectionCount = this.intersection(synSet, sentence);
                    if (intersectionCount > maxIntersection) {
                        maxIntersection = intersectionCount;
                    }
                }
                let maxSynSets = new Array();
                for (let j = 0; j < synSets.length; j++) {
                    let synSet = synSets[j];
                    if (this.intersection(synSet, sentence) == maxIntersection) {
                        maxSynSets.push(synSet);
                    }
                }
                if (maxSynSets.length > 0) {
                    done = true;
                    sentence.getWord(i).setSemantic(maxSynSets[random.nextInt(maxSynSets.length)].getId());
                }
            }
            return done;
        }
    }
    exports.Lesk = Lesk;
});
//# sourceMappingURL=Lesk.js.map