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
    exports.TreeAutoSemantic = void 0;
    const AutoSemantic_1 = require("../AutoSemantic");
    class TreeAutoSemantic extends AutoSemantic_1.AutoSemantic {
        /**
         * The method constructs all possible senses for the word at position index in the given parse tree. The method checks
         * the previous two words and the current word; the previous, current and next word, current and the next
         * two words to add three word multiword sense (that occurs in the Turkish wordnet) to the result list. The
         * method then check the previous word and current word; current word and the next word to add a two word multiword
         * sense to the result list. Lastly, the method adds all possible senses of the current word to the result list.
         * @param wordNet Turkish wordnet
         * @param fsm Turkish morphological analyzer
         * @param leafList Leaves of the parse tree to be semantically disambiguated.
         * @param index Position of the word to be disambiguated.
         * @return All possible senses for the word at position index in the given parse tree.
         */
        getCandidateSynSets(wordNet, fsm, leafList, index) {
            let twoPrevious = null, previous = null, current, twoNext = null, next = null;
            let synSets = new Array();
            current = leafList[index].getLayerInfo();
            if (index > 1) {
                twoPrevious = leafList[index - 2].getLayerInfo();
            }
            if (index > 0) {
                previous = leafList[index - 1].getLayerInfo();
            }
            if (index != leafList.length - 1) {
                next = leafList[index + 1].getLayerInfo();
            }
            if (index < leafList.length - 2) {
                twoNext = leafList[index + 2].getLayerInfo();
            }
            synSets = wordNet.constructSynSets(current.getMorphologicalParseAt(0).getWord().getName(), current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0), fsm);
            if (twoPrevious != null && twoPrevious.getMorphologicalParseAt(0) != null && previous.getMorphologicalParseAt(0) != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, twoPrevious.getMorphologicalParseAt(0), twoPrevious.getMetamorphicParseAt(0), previous.getMorphologicalParseAt(0), previous.getMetamorphicParseAt(0), current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0)));
            }
            if (previous != null && previous.getMorphologicalParseAt(0) != null && next != null && next.getMorphologicalParseAt(0) != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, previous.getMorphologicalParseAt(0), previous.getMetamorphicParseAt(0), current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0), next.getMorphologicalParseAt(0), next.getMetamorphicParseAt(0)));
            }
            if (next != null && next.getMorphologicalParseAt(0) != null && twoNext != null && twoNext.getMorphologicalParseAt(0) != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0), next.getMorphologicalParseAt(0), next.getMetamorphicParseAt(0), twoNext.getMorphologicalParseAt(0), twoNext.getMetamorphicParseAt(0)));
            }
            if (previous != null && previous.getMorphologicalParseAt(0) != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, previous.getMorphologicalParseAt(0), previous.getMetamorphicParseAt(0), current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0)));
            }
            if (next != null && next.getMorphologicalParseAt(0) != null) {
                this.addAll(synSets, wordNet.constructIdiomSynSets(fsm, current.getMorphologicalParseAt(0), current.getMetamorphicParseAt(0), next.getMorphologicalParseAt(0), next.getMetamorphicParseAt(0)));
            }
            return synSets;
        }
        /**
         * The method tries to semantic annotate as many words in the parse tree as possible.
         * @param parseTree Parse tree to be semantically disambiguated.
         */
        autoSemantic(parseTree) {
            this.autoLabelSingleSemantics(parseTree);
        }
    }
    exports.TreeAutoSemantic = TreeAutoSemantic;
});
//# sourceMappingURL=TreeAutoSemantic.js.map