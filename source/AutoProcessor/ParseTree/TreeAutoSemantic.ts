import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";
import {AutoSemantic} from "../AutoSemantic";

export abstract class TreeAutoSemantic extends AutoSemantic{

    protected abstract autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean

    protected getCandidateSynSets(wordNet: WordNet,
                                  fsm: FsmMorphologicalAnalyzer,
                                  leafList: Array<ParseNodeDrawable>,
                                  index: number): Array<SynSet>{
        let twoPrevious = null, previous = null, current, twoNext = null, next = null;
        let synSets = new Array<SynSet>();
        current = leafList[index].getLayerInfo();
        if (index > 1){
            twoPrevious = leafList[index - 2].getLayerInfo();
        }
        if (index > 0){
            previous = leafList[index - 1].getLayerInfo();
        }
        if (index != leafList.length - 1){
            next = leafList[index + 1].getLayerInfo();
        }
        if (index < leafList.length - 2){
            twoNext = leafList[index + 2].getLayerInfo();
        }
        synSets = wordNet.constructSynSets(current.getMorphologicalParseAt(0).getWord().getName(),
            current.getMorphologicalParseAt(0),
            current.getMetamorphicParseAt(0),
            fsm);
        if (twoPrevious != null && twoPrevious.getMorphologicalParseAt(0) != null && previous.getMorphologicalParseAt(0) != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                twoPrevious.getMorphologicalParseAt(0),
                twoPrevious.getMetamorphicParseAt(0),
                previous.getMorphologicalParseAt(0),
                previous.getMetamorphicParseAt(0),
                current.getMorphologicalParseAt(0),
                current.getMetamorphicParseAt(0)));
        }
        if (previous != null && previous.getMorphologicalParseAt(0) != null && next != null && next.getMorphologicalParseAt(0) != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                previous.getMorphologicalParseAt(0),
                previous.getMetamorphicParseAt(0),
                current.getMorphologicalParseAt(0),
                current.getMetamorphicParseAt(0),
                next.getMorphologicalParseAt(0),
                next.getMetamorphicParseAt(0)));
        }
        if (next != null && next.getMorphologicalParseAt(0) != null && twoNext != null && twoNext.getMorphologicalParseAt(0) != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                current.getMorphologicalParseAt(0),
                current.getMetamorphicParseAt(0),
                next.getMorphologicalParseAt(0),
                next.getMetamorphicParseAt(0),
                twoNext.getMorphologicalParseAt(0),
                twoNext.getMetamorphicParseAt(0)));
        }
        if (previous != null && previous.getMorphologicalParseAt(0) != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                previous.getMorphologicalParseAt(0),
                previous.getMetamorphicParseAt(0),
                current.getMorphologicalParseAt(0),
                current.getMetamorphicParseAt(0)));
        }
        if (next != null && next.getMorphologicalParseAt(0) != null){
            this.addAll(synSets, wordNet.constructIdiomSynSets(fsm,
                current.getMorphologicalParseAt(0),
                current.getMetamorphicParseAt(0),
                next.getMorphologicalParseAt(0),
                next.getMetamorphicParseAt(0)));
        }
        return synSets;
    }

    autoSemantic(parseTree: ParseTreeDrawable){
        this.autoLabelSingleSemantics(parseTree)
    }
}