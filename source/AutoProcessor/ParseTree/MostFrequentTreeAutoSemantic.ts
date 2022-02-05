import {TreeAutoSemantic} from "./TreeAutoSemantic";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {IsTurkishLeafNode} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MostFrequentTreeAutoSemantic extends TreeAutoSemantic{

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
        for (let i = 0; i < leafList.length; i++){
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, leafList, i);
            if (synSets.length > 0){
                let best = this.mostFrequent(synSets, leafList[i].getLayerInfo().getMorphologicalParseAt(0).getWord().getName());
                if (best != null){
                    leafList[i].getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, best.getId());
                }
            }
        }
        return true;
    }

}