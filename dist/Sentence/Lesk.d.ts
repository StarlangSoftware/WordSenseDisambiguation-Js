import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class Lesk extends SentenceAutoSemantic {
    private turkishWordNet;
    private fsm;
    /**
     * Constructor for the {@link Lesk} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     * Calculates the number of words that occur (i) in the definition or example of the given synset and (ii) in the
     * given sentence.
     * @param synSet Synset of which the definition or example will be checked
     * @param sentence Sentence to be annotated.
     * @return The number of words that occur (i) in the definition or example of the given synset and (ii) in the given
     * sentence.
     */
    private intersection;
    /**
     * The method annotates the word senses of the words in the sentence according to the simplified Lesk algorithm.
     * Lesk is an algorithm that chooses the sense whose definition or example shares the most words with the target
     * word’s neighborhood. The algorithm processes target words one by one. First, the algorithm constructs an array of
     * all possible senses for the target word to annotate. Then for each possible sense, the number of words shared
     * between the definition of sense synset and target sentence is calculated. Then the sense with the maximum
     * intersection count is selected.
     * @param sentence Sentence to be annotated.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
