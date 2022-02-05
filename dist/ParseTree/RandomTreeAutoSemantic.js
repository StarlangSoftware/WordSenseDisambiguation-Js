(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TreeAutoSemantic", "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector", "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-util/dist/Random"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomTreeAutoSemantic = void 0;
    const TreeAutoSemantic_1 = require("./TreeAutoSemantic");
    const NodeDrawableCollector_1 = require("nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector");
    const IsTurkishLeafNode_1 = require("nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    class RandomTreeAutoSemantic extends TreeAutoSemantic_1.TreeAutoSemantic {
        constructor(turkishWordNet, fsm) {
            super();
            this.turkishWordNet = turkishWordNet;
            this.fsm = fsm;
        }
        autoLabelSingleSemantics(parseTree) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(parseTree.getRoot(), new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            let random = new Random_1.Random(1);
            for (let i = 0; i < leafList.length; i++) {
                let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, leafList, i);
                if (synSets.length > 0) {
                    leafList[i].getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, synSets[random.nextInt(synSets.length)].getId());
                }
            }
            return true;
        }
    }
    exports.RandomTreeAutoSemantic = RandomTreeAutoSemantic;
});
//# sourceMappingURL=RandomTreeAutoSemantic.js.map