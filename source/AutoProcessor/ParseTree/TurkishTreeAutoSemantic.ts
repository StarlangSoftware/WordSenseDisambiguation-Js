import {TreeAutoSemantic} from "./TreeAutoSemantic";
import {ParseTreeDrawable} from "nlptoolkit-annotatedtree/dist/ParseTreeDrawable";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {NodeDrawableCollector} from "nlptoolkit-annotatedtree/dist/Processor/NodeDrawableCollector";
import {IsTurkishLeafNode} from "nlptoolkit-annotatedtree/dist/Processor/Condition/IsTurkishLeafNode";
import {ParseNodeDrawable} from "nlptoolkit-annotatedtree/dist/ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";

export class TurkishTreeAutoSemantic extends TreeAutoSemantic{

    private turkishWordNet: WordNet;
    private fsm: FsmMorphologicalAnalyzer;

    /**
     * Constructor for the {@link TurkishTreeAutoSemantic} class. Gets the Turkish wordnet and Turkish fst based
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
     * The method checks the number of possible senses of each word in the parse tree. If all words have only one
     * possible sense, it annotates the words with the corresponding sense. Otherwise, it does not annotate any words.
     * @param parseTree The parse tree for which word sense annotation will be done automatically.
     * @return True, if at least one word is semantically annotated, false otherwise.
     */
    protected autoLabelSingleSemantics(parseTree: ParseTreeDrawable): boolean {
        let modified = false;
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable> parseTree.getRoot(), new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let parseNode of leafList){
            let info = parseNode.getLayerInfo();
            if (info.getLayerData(ViewLayerType.INFLECTIONAL_GROUP) != null){
                let meanings = new Array<Array<SynSet>>();
                for (let i = 0; i < info.getNumberOfWords(); i++){
                    meanings.push(this.turkishWordNet.constructSynSets(info.getMorphologicalParseAt(i).getWord().getName(),
                        info.getMorphologicalParseAt(i),
                        info.getMetamorphicParseAt(i),
                        this.fsm));
                }
                switch (info.getNumberOfWords()){
                    case 1:
                        if (meanings[0].length == 1){
                            modified = true;
                            parseNode.getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, meanings[0][0].getId());
                        }
                        break;
                    case 2:
                        if (meanings[0].length == 1 && meanings[1].length == 1){
                            modified = true;
                            parseNode.getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, meanings[0][0].getId() + "$" + meanings[1][0].getId());
                        }
                        break;
                    case 3:
                        if (meanings[0].length == 1 && meanings[1].length == 1 && meanings[2].length == 1){
                            modified = true;
                            parseNode.getLayerInfo().setLayerData(ViewLayerType.SEMANTICS, meanings[0][0].getId() + "$" + meanings[1][0].getId() + "$" + meanings[2][0].getId());
                        }
                        break;
                }
            }
        }
        return modified;
    }

}