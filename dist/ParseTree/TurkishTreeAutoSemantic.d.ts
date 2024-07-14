import { TreeAutoSemantic } from "./TreeAutoSemantic";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class TurkishTreeAutoSemantic extends TreeAutoSemantic {
    private turkishWordNet;
    private fsm;
    /**
     * Constructor for the {@link TurkishTreeAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     * The method checks the number of possible senses of each word in the parse tree. If all words have only one
     * possible sense, it annotates the words with the corresponding sense. Otherwise, it does not annotate any words.
     * @param parseTree The parse tree for which word sense annotation will be done automatically.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean;
}
