import {SentenceAutoSemantic} from "./SentenceAutoSemantic";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Random} from "nlptoolkit-util/dist/Random";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class Lesk extends SentenceAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    /**
     * Constructor for the {@link Lesk} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    private intersection(synSet: SynSet, sentence: AnnotatedSentence): number{
        let words1
        if (synSet.getExample() != null){
            words1 = (synSet.getLongDefinition() + " " + synSet.getExample()).split(" ");
        } else {
            words1 = synSet.getLongDefinition().split(" ");
        }
        let words2 = sentence.toWords().split(" ");
        let count = 0;
        for (let word1 of words1){
            for (let word2 of words2){
                if (word1.toLocaleLowerCase("tr") == word2.toLocaleLowerCase("tr")){
                    count++;
                }
            }
        }
        return count;
    }

    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean {
        let random = new Random(1);
        let done = false;
        for (let i = 0; i < sentence.wordCount(); i++) {
            let synSets = this.getCandidateSynSets(this.turkishWordNet, this.fsm, sentence, i);
            let maxIntersection = -1;
            for (let j = 0; j < synSets.length; j++){
                let synSet = synSets[j];
                let intersectionCount = this.intersection(synSet, sentence);
                if (intersectionCount > maxIntersection){
                    maxIntersection = intersectionCount;
                }
            }
            let maxSynSets = new Array<SynSet>();
            for (let j = 0; j < synSets.length; j++){
                let synSet = synSets[j];
                if (this.intersection(synSet, sentence) == maxIntersection){
                    maxSynSets.push(synSet);
                }
            }
            if (maxSynSets.length > 0){
                done = true;
                (<AnnotatedWord> sentence.getWord(i)).setSemantic(maxSynSets[random.nextInt(maxSynSets.length)].getId());
            }
        }
        return done;
    }

}