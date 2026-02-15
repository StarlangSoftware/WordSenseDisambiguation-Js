import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { SynSet } from "nlptoolkit-wordnet/dist/SynSet";
import { AutoSemantic } from "../AutoSemantic";
export declare abstract class SentenceAutoSemantic extends AutoSemantic {
    /**
     * The method should set the senses of all words, for which there is only one possible sense.
     * @param sentence The sentence for which word sense disambiguation will be determined automatically.
     */
    protected abstract autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
    /**
     * The method constructs all possible senses for the word at position index in the given sentence. The method checks
     * the previous two words and the current word; the previous, current and next word, current and the next
     * two words to add three word multiword sense (that occurs in the Turkish wordnet) to the result list. The
     * method then check the previous word and current word; current word and the next word to add a two word multiword
     * sense to the result list. Lastly, the method adds all possible senses of the current word to the result list.
     * @param wordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     * @param sentence Sentence to be semantically disambiguated.
     * @param index Position of the word to be disambiguated.
     * @return All possible senses for the word at position index in the given sentence.
     */
    protected getCandidateSynSets(wordNet: WordNet, fsm: FsmMorphologicalAnalyzer, sentence: AnnotatedSentence, index: number): Array<SynSet>;
    /**
     * The method tries to semantic annotate as many words in the sentence as possible.
     * @param sentence Sentence to be semantically disambiguated.
     */
    autoSemantic(sentence: AnnotatedSentence): void;
}
