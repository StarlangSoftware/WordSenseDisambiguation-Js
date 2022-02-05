import { TreeAutoSemantic } from "./TreeAutoSemantic";
import { ParseTreeDrawable } from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class Lesk extends TreeAutoSemantic {
    private turkishWordNet;
    private fsm;
    constructor(turkishWordNet: WordNet, fsm: FsmMorphologicalAnalyzer);
    private intersection;
    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean;
}
