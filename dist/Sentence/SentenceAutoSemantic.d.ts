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
    protected getCandidateSynSets(wordNet: WordNet, fsm: FsmMorphologicalAnalyzer, sentence: AnnotatedSentence, index: number): Array<SynSet>;
    autoSemantic(sentence: AnnotatedSentence): void;
}
