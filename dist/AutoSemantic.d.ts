import { SynSet } from "nlptoolkit-wordnet/dist/SynSet";
export declare abstract class AutoSemantic {
    protected addAll(synSets: Array<SynSet>, synSetsAdded: Array<SynSet>): void;
    protected mostFrequent(synSets: Array<SynSet>, root: string): SynSet;
}
