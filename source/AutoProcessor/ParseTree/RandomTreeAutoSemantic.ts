import {TreeAutoSemantic} from "./TreeAutoSemantic";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {IsTurkishLeafNode} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Random} from "nlptoolkit-util/dist/Random";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";

export class RandomTreeAutoSemantic extends TreeAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        let random = new Random(1)
        for (let i = 0; i < leafList.length; i++){
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, leafList, i);
            if (synSets.length > 0){
                leafList[i].getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, synSets[random.nextInt(synSets.length)].getId());
            }
        }
        return true;
    }

}