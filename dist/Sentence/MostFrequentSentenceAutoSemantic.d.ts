import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class MostFrequentSentenceAutoSemantic extends SentenceAutoSemantic {
    private readonly turkishWordNet;
    private readonly fsm;
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    /**
     Determines the synset containing the literal with the lowest sense number.
     @param literals an ArrayList of Literal objects
     @return the SynSet containing the literal with the lowest sense number, or null if the input list is empty
     */
    private mostFrequentOfLiterals;
    /**
     * Checks
     * 1. the previous two words and the current word; the previous, current and next word, current and the next
     * two words for a three word multiword expression that occurs in the Turkish wordnet.
     * 2. the previous word and current word; current word and the next word for a two word multiword expression that
     * occurs in the Turkish wordnet.
     * 3. the current word
     * and sets the most frequent sense for that multiword expression or word.
     * @param sentence The sentence for which word sense disambiguation will be determined automatically.
     */
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
