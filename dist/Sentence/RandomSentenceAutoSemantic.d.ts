import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { SentenceAutoSemantic } from "./SentenceAutoSemantic";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class RandomSentenceAutoSemantic extends SentenceAutoSemantic {
    private turkishWordNet;
    private fsm;
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean;
}
