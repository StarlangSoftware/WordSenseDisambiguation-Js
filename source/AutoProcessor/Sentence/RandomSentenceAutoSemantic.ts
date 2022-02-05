import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SentenceAutoSemantic} from "./SentenceAutoSemantic";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {Random} from "nlptoolkit-util/dist/Random";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class RandomSentenceAutoSemantic extends SentenceAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean {
        let random = new Random(1);
        for (let i = 0; i < sentence.wordCount(); i++) {
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
            if (synSets.length > 0){
                (<AnnotatedWord> sentence.getWord(i)).setSemantic(synSets[random.nextInt(synSets.length)].getId());
            }
        }
        return true;
    }

}