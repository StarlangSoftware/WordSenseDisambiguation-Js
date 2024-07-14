import { TreeAutoSemantic } from "./TreeAutoSemantic";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class MostFrequentTreeAutoSemantic extends TreeAutoSemantic {
    private turkishWordNet;
    private fsm;
    /**
     * Constructor for the {@link MostFrequentTreeAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     * The method annotates the word senses of the words in the parse tree according to the baseline most frequent
     * algorithm. The algorithm processes target words one by one. First, the algorithm constructs an array of
     * all possible senses for the target word to annotate. Then the sense with the minimum sense index is selected. In
     * the wordnet, literals are ordered and indexed according to their usage. The most frequently used sense of the
     * literal has sense number 1, then 2, etc.
     * @param parseTree Parse tree to be annotated.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean;
}
