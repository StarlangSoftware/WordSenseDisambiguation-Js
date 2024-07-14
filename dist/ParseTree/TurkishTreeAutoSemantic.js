(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeAutoSemantic", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishTreeAutoSemantic = void 0;
    const TreeAutoSemantic_1 = require("./TreeAutoSemantic");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const IsTurkishLeafNode_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class TurkishTreeAutoSemantic extends TreeAutoSemantic_1.TreeAutoSemantic {
        /**
         * Constructor for the {@link TurkishTreeAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
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
         * The method checks the number of possible senses of each word in the parse tree. If all words have only one
         * possible sense, it annotates the words with the corresponding sense. Otherwise, it does not annotate any words.
         * @param parseTree The parse tree for which word sense annotation will be done automatically.
         * @return True, if at least one word is semantically annotated, false otherwise.
         */
        autoLabelSingleSemantics(parseTree) {
            let modified = false;
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList) {
                let info = parseNode.getLayerInfo();
                if (info.getLayerData(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP) != null) {
                    let meanings = new Array();
                    for (let i = 0; i < info.getNumberOfWords(); i++) {
                        meanings.push(this.turkishWordNet.constructSynSets(info.getMorphologicalParseAt(i).getWord().getName(), info.getMorphologicalParseAt(i), info.getMetamorphicParseAt(i), this.fsm));
                    }
                    switch (info.getNumberOfWords()) {
                        case 1:
                            if (meanings[0].length == 1) {
                                modified = true;
                                parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, meanings[0][0].getId());
                            }
                            break;
                        case 2:
                            if (meanings[0].length == 1 && meanings[1].length == 1) {
                                modified = true;
                                parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, meanings[0][0].getId() + "$" + meanings[1][0].getId());
                            }
                            break;
                        case 3:
                            if (meanings[0].length == 1 && meanings[1].length == 1 && meanings[2].length == 1) {
                                modified = true;
                                parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, meanings[0][0].getId() + "$" + meanings[1][0].getId() + "$" + meanings[2][0].getId());
                            }
                            break;
                    }
                }
            }
            return modified;
        }
    }
    exports.TurkishTreeAutoSemantic = TurkishTreeAutoSemantic;
});
//# sourceMappingURL=TurkishTreeAutoSemantic.js.map