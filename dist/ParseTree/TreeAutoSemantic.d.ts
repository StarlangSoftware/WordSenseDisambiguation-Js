import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { ParseNodeDrawable } from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { SynSet } from "nlptoolkit-wordnet/dist/SynSet";
import { AutoSemantic } from "../AutoSemantic";
export declare abstract class TreeAutoSemantic extends AutoSemantic {
    protected abstract autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean;
    protected getCandidateSynSets(wordNet: WordNet, fsm: FsmMorphologicalAnalyzer, leafList: Array<ParseNodeDrawable>, index: number): Array<SynSet>;
    autoSemantic(parseTree: ParseTreeDrawable): void;
}
