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

    /**
     * Constructor for the {@link RandomSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
     * morphological analyzer from the user and sets the corresponding attributes.
     * @param turkishWordNet Turkish wordnet
     * @param fsm Turkish morphological analyzer
     */
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer) {
        super();
        this.turkishWordNet = turkishWordNet
        this.fsm = fsm
    }

    /**
     * The method annotates the word senses of the words in the sentence randomly. The algorithm processes target
     * words one by one. First, the algorithm constructs an array of all possible senses for the target word to
     * annotate. Then it chooses a sense randomly.
     * @param sentence Sentence to be annotated.
     * @return True.
     */
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