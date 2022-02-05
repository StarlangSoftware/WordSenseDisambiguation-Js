(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeAutoSemantic", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-util/dist/Random", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lesk = void 0;
    const TreeAutoSemantic_1 = require("./TreeAutoSemantic");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const IsTurkishLeafNode_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode");
    class Lesk extends TreeAutoSemantic_1.TreeAutoSemantic {
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        intersection(synSet, leafList) {
            let words1;
            if (synSet.getExample() != null) {
                words1 = (synSet.getLongDefinition() + " " + synSet.getExample()).split(" ");
            }
            else {
                words1 = synSet.getLongDefinition().split(" ");
            }
            let words2 = new Array();
            for (let i = 0; i < leafList.length; i++) {
                words2.push(leafList[i].getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD));
            }
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
        autoLabelSingleSemantics(parseTree) {
            let random = new Random_1.Random(1);
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            let done = false;
            for (let i = 0; i < leafList.length; i++) {
                let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, leafList, i);
                let maxIntersection = -1;
                for (let j = 0; j < synSets.length; j++) {
                    let synSet = synSets[j];
                    let intersectionCount = this.intersection(synSet, leafList);
                    if (intersectionCount > maxIntersection) {
                        maxIntersection = intersectionCount;
                    }
                }
                let maxSynSets = new Array();
                for (let j = 0; j < synSets.length; j++) {
                    let synSet = synSets[j];
                    if (this.intersection(synSet, leafList) == maxIntersection) {
                        maxSynSets.push(synSet);
                    }
                }
                if (maxSynSets.length > 0) {
                    leafList[i].getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, maxSynSets[random.nextInt(maxSynSets.length)].getId());
                    done = true;
                }
            }
            return done;
        }
    }
    exports.Lesk = Lesk;
});
//# sourceMappingURL=Lesk.js.map