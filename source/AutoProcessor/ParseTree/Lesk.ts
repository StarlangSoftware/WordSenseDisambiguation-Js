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

    /**
     * Constructor for the Lesk class. Gets the Turkish wordnet and Turkish fst based
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
     * Calculates the number of words that occur (i) in the definition or example of the given synset and (ii) in the
     * given parse tree.
     * @param synSet Synset of which the definition or example will be checked
     * @param leafList Leaf nodes of the parse tree.
     * @return The number of words that occur (i) in the definition or example of the given synset and (ii) in the given
     * parse tree.
     */
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

    /**
     * The method annotates the word senses of the words in the parse tree according to the simplified Lesk algorithm.
     * Lesk is an algorithm that chooses the sense whose definition or example shares the most words with the target
     * word’s neighborhood. The algorithm processes target words one by one. First, the algorithm constructs an array of
     * all possible senses for the target word to annotate. Then for each possible sense, the number of words shared
     * between the definition of sense synset and target tree is calculated. Then the sense with the maximum
     * intersection count is selected.
     * @param parseTree Parse tree to be annotated.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
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