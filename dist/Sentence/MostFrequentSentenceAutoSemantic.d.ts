import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class MostFrequentSentenceAutoSemantic extends SentenceAutoSemantic {
    private turkishWordNet;
    private fsm;
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
