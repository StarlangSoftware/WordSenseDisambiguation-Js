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

    /**
     * Constructor for the {@link RandomSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
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
     * The method annotates the word senses of the words in the parse tree randomly. The algorithm processes target
     * words one by one. First, the algorithm constructs an array of all possible senses for the target word to
     * annotate. Then it chooses a sense randomly.
     * @param parseTree Parse tree to be annotated.
     * @return True.
     */
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