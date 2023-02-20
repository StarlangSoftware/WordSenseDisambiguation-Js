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
        /**
         Determines the synset containing the literal with the lowest sense number.
         @param literals an ArrayList of Literal objects
         @return the SynSet containing the literal with the lowest sense number, or null if the input list is empty
         */
        mostFrequentOfLiterals(literals) {
            if (literals.length == 1) {
                return this.turkishWordNet.getSynSetWithId(literals[0].getSynSetId());
            }
            let minSense = 50;
            let best = null;
            for (let literal of literals) {
                if (literal.getSense() < minSense) {
                    minSense = literal.getSense();
                    best = this.turkishWordNet.getSynSetWithId(literal.getSynSetId());
                }
            }
            return best;
        }
        /**
         * Checks
         * 1. the previous two words and the current word; the previous, current and next word, current and the next
         * two words for a three word multiword expression that occurs in the Turkish wordnet.
         * 2. the previous word and current word; current word and the next word for a two word multiword expression that
         * occurs in the Turkish wordnet.
         * 3. the current word
         * and sets the most frequent sense for that multiword expression or word.
         * @param sentence The sentence for which word sense disambiguation will be determined automatically.
         */
        autoLabelSingleSemantics(sentence) {
            let done = false;
            let twoPrevious = null, previous = null, current, twoNext = null, next = null;
            for (let i = 0; i < sentence.wordCount(); i++) {
                current = sentence.getWord(i);
                if (i > 1) {
                    twoPrevious = sentence.getWord(i - 2);
                }
                if (i > 0) {
                    previous = sentence.getWord(i - 1);
                }
                if (i != sentence.wordCount() - 1) {
                    next = sentence.getWord(i + 1);
                }
                if (i < sentence.wordCount() - 2) {
                    twoNext = sentence.getWord(i + 2);
                }
                if (current.getSemantic() == null && current.getParse() != null) {
                    if (twoPrevious != null && twoPrevious.getParse() != null && previous.getParse() != null) {
                        let literals = this.turkishWordNet.constructIdiomLiterals(this.fsm, twoPrevious.getParse(), twoPrevious.getMetamorphicParse(), previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse());
                        if (literals.length > 0) {
                            let bestSynset = this.mostFrequentOfLiterals(literals);
                            if (bestSynset != null) {
                                current.setSemantic(bestSynset.getId());
                                done = true;
                                continue;
                            }
                        }
                    }
                    if (previous != null && previous.getParse() != null && next != null && next.getParse() != null) {
                        let literals = this.turkishWordNet.constructIdiomLiterals(this.fsm, previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse());
                        if (literals.length > 0) {
                            let bestSynset = this.mostFrequentOfLiterals(literals);
                            if (bestSynset != null) {
                                current.setSemantic(bestSynset.getId());
                                done = true;
                                continue;
                            }
                        }
                    }
                    if (next != null && next.getParse() != null && twoNext != null && twoNext.getParse() != null) {
                        let literals = this.turkishWordNet.constructIdiomLiterals(this.fsm, current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse(), twoNext.getParse(), twoNext.getMetamorphicParse());
                        if (literals.length > 0) {
                            let bestSynset = this.mostFrequentOfLiterals(literals);
                            if (bestSynset != null) {
                                current.setSemantic(bestSynset.getId());
                                done = true;
                                continue;
                            }
                        }
                    }
                    if (previous != null && previous.getParse() != null) {
                        let literals = this.turkishWordNet.constructIdiomLiterals(this.fsm, previous.getParse(), previous.getMetamorphicParse(), current.getParse(), current.getMetamorphicParse());
                        if (literals.length > 0) {
                            let bestSynset = this.mostFrequentOfLiterals(literals);
                            if (bestSynset != null) {
                                current.setSemantic(bestSynset.getId());
                                done = true;
                                continue;
                            }
                        }
                    }
                    if (current.getSemantic() == null && next != null && next.getParse() != null) {
                        let literals = this.turkishWordNet.constructIdiomLiterals(this.fsm, current.getParse(), current.getMetamorphicParse(), next.getParse(), next.getMetamorphicParse());
                        if (literals.length > 0) {
                            let bestSynset = this.mostFrequentOfLiterals(literals);
                            if (bestSynset != null) {
                                current.setSemantic(bestSynset.getId());
                                done = true;
                                continue;
                            }
                        }
                    }
                    let literals = this.turkishWordNet.constructLiterals(current.getParse().getWord().getName(), current.getParse(), current.getMetamorphicParse(), this.fsm);
                    if (current.getSemantic() == null && literals.length > 0) {
                        let bestSynset = this.mostFrequentOfLiterals(literals);
                        if (bestSynset != null) {
                            current.setSemantic(bestSynset.getId());
                            done = true;
                        }
                    }
                }
            }
            return done;
        }
    }
    exports.MostFrequentSentenceAutoSemantic = MostFrequentSentenceAutoSemantic;
});
//# sourceMappingURL=MostFrequentSentenceAutoSemantic.js.map