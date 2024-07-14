(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoSemantic = void 0;
    class AutoSemantic {
        addAll(synSets, synSetsAdded) {
            for (let synSet of synSetsAdded) {
                synSets.push(synSet);
            }
        }
        /**
         * Returns the most frequent root word in the given synsets. In the wordnet, literals are ordered and indexed
         * according to their usage. The most frequently used sense of the literal has sense number 1, then 2, etc. In order
         * to get literal from root word, the algorithm checks root for a prefix and suffix. So, if the root is a prefix or
         * suffix of a literal, it is included in the search.
         * @param synSets All possible synsets to search for most frequent literal.
         * @param root Root word to be checked.
         * @return Synset storing most frequent literal either starting or ending with the given root form.
         */
        mostFrequent(synSets, root) {
            if (synSets.length == 1) {
                return synSets[0];
            }
            let minSense = 50;
            let best = null;
            for (let synSet of synSets) {
                for (let i = 0; i < synSet.getSynonym().literalSize(); i++) {
                    if (synSet.getSynonym().getLiteral(i).getName().toLocaleLowerCase("tr").startsWith(root)
                        || synSet.getSynonym().getLiteral(i).getName().toLocaleLowerCase("tr").endsWith(" " + root)) {
                        if (synSet.getSynonym().getLiteral(i).getSense() < minSense) {
                            minSense = synSet.getSynonym().getLiteral(i).getSense();
                            best = synSet;
                        }
                    }
                }
            }
            return best;
        }
    }
    exports.AutoSemantic = AutoSemantic;
});
//# sourceMappingURL=AutoSemantic.js.map