import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class RandomSentenceAutoSemantic extends SentenceAutoSemantic {
    private turkishWordNet;
    private fsm;
    /**
     * Constructor for the {@link RandomSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     * The method annotates the word senses of the words in the sentence randomly. The algorithm processes target
     * words one by one. First, the algorithm constructs an array of all possible senses for the target word to
     * annotate. Then it chooses a sense randomly.
     * @param sentence Sentence to be annotated.
     * @return True.
     */
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
