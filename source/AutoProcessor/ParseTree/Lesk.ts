import {TreeAutoSemantic} from "./TreeAutoSemantic";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Random} from "nlptoolkit-util/dist/Random";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {IsTurkishLeafNode} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode";

export class Lesk extends TreeAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    private intersection(synSet: SynSet, leafList: Array<ParseNodeDrawable>): number{
        let words1
        if (synSet.getExample() != null){
            words1 = (synSet.getLongDefinition() + " " + synSet.getExample()).split(" ");
        } else {
            words1 = synSet.getLongDefinition().split(" ");
        }
        let words2 = new Array<string>();
        for (let i = 0; i < leafList.length; i++){
            words2.push(leafList[i].getLayerData(ViewLayerType.TURKISH_WORD));
        }
        let count = 0;
        for (let word1 of words1){
            for (let word2 of words2){
                if (word1.toLocaleLowerCase("tr") == word2.toLocaleLowerCase("tr")){
                    count++;
                }
            }
        }
        return count;
    }

    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean {
        let random = new Random(1);
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        let done = false;
        for (let i = 0; i < leafList.length; i++){
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, leafList, i);
            let maxIntersection = -1;
            for (let j = 0; j < synSets.length; j++){
                let synSet = synSets[j];
                let intersectionCount = this.intersection(synSet,leafList);
                if (intersectionCount > maxIntersection){
                    maxIntersection = intersectionCount;
                }
            }
            let maxSynSets = new Array<SynSet>();
            for (let j = 0; j < synSets.length; j++){
                let synSet = synSets[j];
                if (this.intersection(synSet,leafList) == maxIntersection){
                    maxSynSets.push(synSet);
                }
            }
            if (maxSynSets.length > 0){
                leafList[i].getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, maxSynSets[random.nextInt(maxSynSets.length)].getId());
                done = true;
            }
        }
        return done;
    }

}