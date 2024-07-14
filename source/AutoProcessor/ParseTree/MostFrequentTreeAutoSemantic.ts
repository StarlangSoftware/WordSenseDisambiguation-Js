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

    /**
     * Constructor for the {@link MostFrequentTreeAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    /**
     * The method annotates the word senses of the words in the parse tree according to the baseline most frequent
     * algorithm. The algorithm processes target words one by one. First, the algorithm constructs an array of
     * all possible senses for the target word to annotate. Then the sense with the minimum sense index is selected. In
     * the wordnet, literals are ordered and indexed according to their usage. The most frequently used sense of the
     * literal has sense number 1, then 2, etc.
     * @param parseTree Parse tree to be annotated.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
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