import {SentenceAutoSemantic} from "./SentenceAutoSemantic";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class MostFrequentSentenceAutoSemantic extends SentenceAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean {
        for (let i = 0; i < sentence.wordCount(); i++) {
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
            if (synSets.length > 0){
                let best = this.mostFrequent(synSets, (<AnnotatedWord> sentence.getWord(i)).getParse().getWord().getName());
                if (best != null){
                    (<AnnotatedWord> sentence.getWord(i)).setSemantic(best.getId());
                }
            }
        }
        return true;
    }

}