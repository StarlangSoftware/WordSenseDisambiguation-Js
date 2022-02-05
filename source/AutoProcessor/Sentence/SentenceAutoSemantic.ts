import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";
import {AutoSemantic} from "../AutoSemantic";

export abstract class SentenceAutoSemantic extends AutoSemantic{

    /**
     * The method should set the senses of all words, for which there is only one possible sense.
     * @param sentence The sentence for which word sense disambiguation will be determined automatically.
     */
    protected abstract autoLabelSingleSemantics(sentence: AnnotatedSentence): boolean

    protected getCandidateSynSets(wordNet: WordNet,
                                  fsm: FsmMorphologicalAnalyzer,
                                  sentence: AnnotatedSentence,
                                  index: number): Array<SynSet>{
        let twoPrevious = null, previous = null, current, twoNext = null, next = null;
        current = <AnnotatedWord> sentence.getWord(index);
        if (index > 1){
            twoPrevious = <AnnotatedWord> sentence.getWord(index - 2);
        }
        if (index > 0){
            previous = <AnnotatedWord> sentence.getWord(index - 1);
        }
        if (index != sentence.wordCount() - 1){
            next = <AnnotatedWord> sentence.getWord(index + 1);
        }
        if (index < sentence.wordCount() - 2){
            twoNext = <AnnotatedWord> sentence.getWord(index + 2);
        }
        let synSets = wordNet.constructSynSets(current.getParse().getWord().getName(),
            current.getParse(), current.getMetamorphicParse(), fsm);
        if (twoPrevious != null && twoPrevious.getParse() != null && previous.getParse() != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                twoPrevious.getParse(),
                twoPrevious.getMetamorphicParse(),
                previous.getParse(),
                previous.getMetamorphicParse(),
                current.getParse(),
                current.getMetamorphicParse()));
        }
        if (previous != null && previous.getParse() != null && next != null && next.getParse() != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                previous.getParse(),
                previous.getMetamorphicParse(),
                current.getParse(),
                current.getMetamorphicParse(),
                next.getParse(),
                next.getMetamorphicParse()));
        }
        if (next != null && next.getParse() != null && twoNext != null && twoNext.getParse() != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                current.getParse(),
                current.getMetamorphicParse(),
                next.getParse(),
                next.getMetamorphicParse(),
                twoNext.getParse(),
                twoNext.getMetamorphicParse()));
        }
        if (previous != null && previous.getParse() != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                previous.getParse(),
                previous.getMetamorphicParse(),
                current.getParse(),
                current.getMetamorphicParse()));
        }
        if (next != null && next.getParse() != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                current.getParse(),
                current.getMetamorphicParse(),
                next.getParse(),
                next.getMetamorphicParse()));
        }
        return synSets;
    }

    autoSemantic(sentence: AnnotatedSentence){
        this.autoLabelSingleSemantics(sentence)
    }
}