import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class TurkishSentenceAutoSemantic extends SentenceAutoSemantic {
    private turkishWordNet;
    private fsm;
    /**
     * Constructor for the {@link TurkishSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     * The method checks
     * 1. the previous two words and the current word; the previous, current and next word, current and the next
     * two words for a three word multi-word expression that occurs in the Turkish wordnet.
     * 2. the previous word and current word; current word and the next word for a two word multi-word expression that
     * occurs in the Turkish wordnet.
     * 3. the current word
     * if it has only one sense. If there is only one sense for that multi-word expression or word; it sets that sense.
     * @param sentence The sentence for which word sense disambiguation will be determined automatically.
     */
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
