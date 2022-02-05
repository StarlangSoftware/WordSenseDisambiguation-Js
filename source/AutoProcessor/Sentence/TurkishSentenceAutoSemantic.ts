import {SentenceAutoSemantic} from "./SentenceAutoSemantic";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class TurkishSentenceAutoSemantic extends SentenceAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    /**
     * Constructor for the {@link TurkishSentenceAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
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
     * The method checks
     * 1. the previous two words and the current word; the previous, current and next word, current and the next
     * two words for a three word multi-word expression that occurs in the Turkish wordnet.
     * 2. the previous word and current word; current word and the next word for a two word multi-word expression that
     * occurs in the Turkish wordnet.
     * 3. the current word
     * if it has only one sense. If there is only one sense for that multi-word expression or word; it sets that sense.
     * @param sentence The sentence for which word sense disambiguation will be determined automatically.
     */
    protected autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean {
        let done = false;
        let twoPrevious = null, previous = null, current, twoNext = null, next = null;
        for (let i = 0; i < sentence.wordCount(); i++){
            current = <AnnotatedWord> sentence.getWord(i);
            if (i > 1){
                twoPrevious = <AnnotatedWord> sentence.getWord(i - 2);
            }
            if (i > 0){
                previous = <AnnotatedWord> sentence.getWord(i - 1);
            }
            if (i != sentence.wordCount() - 1){
                next = <AnnotatedWord> sentence.getWord(i + 1);
            }
            if (i < sentence.wordCount() - 2){
                twoNext = <AnnotatedWord> sentence.getWord(i + 2);
            }
            if (current.getSemantic() == null && current.getParse() != null){
                if (twoPrevious != null && twoPrevious.getParse() != null && previous.getParse() != null){
                    let idioms = this.turkishWordNet.constructIdiomSynSets(this.fsm,
                        twoPrevious.getParse(),
                        twoPrevious.getMetamorphicParse(),
                        previous.getParse(),
                        previous.getMetamorphicParse(),
                        current.getParse(),
                        current.getMetamorphicParse());
                    if (idioms.length == 1){
                        current.setSemantic(idioms[0].getId());
                        done = true;
                        continue;
                    }
                }
                if (previous != null && previous.getParse() != null && next != null && next.getParse() != null){
                    let idioms = this.turkishWordNet.constructIdiomSynSets(this.fsm,
                        previous.getParse(),
                        previous.getMetamorphicParse(),
                        current.getParse(),
                        current.getMetamorphicParse(),
                        next.getParse(),
                        next.getMetamorphicParse());
                    if (idioms.length == 1){
                        current.setSemantic(idioms[0].getId());
                        done = true;
                        continue;
                    }
                }
                if (next != null && next.getParse() != null && twoNext != null && twoNext.getParse() != null){
                    let idioms = this.turkishWordNet.constructIdiomSynSets(this.fsm,
                        current.getParse(),
                        current.getMetamorphicParse(),
                        next.getParse(),
                        next.getMetamorphicParse(),
                        twoNext.getParse(),
                        twoNext.getMetamorphicParse());
                    if (idioms.length == 1){
                        current.setSemantic(idioms[0].getId());
                        done = true;
                        continue;
                    }
                }
                if (previous != null && previous.getParse() != null){
                    let idioms = this.turkishWordNet.constructIdiomSynSets(this.fsm,
                        previous.getParse(),
                        previous.getMetamorphicParse(),
                        current.getParse(),
                        current.getMetamorphicParse());
                    if (idioms.length == 1){
                        current.setSemantic(idioms[0].getId());
                        done = true;
                        continue;
                    }
                }
                if (current.getSemantic() == null && next != null && next.getParse() != null){
                    let idioms = this.turkishWordNet.constructIdiomSynSets(this.fsm,
                        current.getParse(),
                        current.getMetamorphicParse(),
                        next.getParse(),
                        next.getMetamorphicParse());
                    if (idioms.length == 1){
                        current.setSemantic(idioms[0].getId());
                        done = true;
                        continue;
                    }
                }
                let meanings = this.turkishWordNet.constructSynSets(current.getParse().getWord().getName(), current.getParse(), current.getMetamorphicParse(), this.fsm);
                if (current.getSemantic() == null && meanings.length == 1){
                    done = true;
                    current.setSemantic(meanings[0].getId());
                }
            }
        }
        return done;
    }

}