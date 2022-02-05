import {SynSet} from "nlptoolkit-wordnet/dist/SynSet";

export abstract class AutoSemantic {

    protected addAll(synSets: Array<SynSet>, synSetsAdded: Array<SynSet>){
        for (let synSet of synSetsAdded){
            synSets.push(synSet)
        }
    }

    protected mostFrequent(synSets: Array<SynSet>, root: string): SynSet{
        if (synSets.length == 1){
            return synSets[0];
        }
        let minSense = 50;
        let best = null;
        for (let synSet of synSets){
            for (let i = 0; i < synSet.getSynonym().literalSize(); i++){
                if (synSet.getSynonym().getLiteral(i).getName().toLocaleLowerCase("tr").startsWith(root)
                    || synSet.getSynonym().getLiteral(i).getName().toLocaleLowerCase("tr").endsWith(" " + root)){
                    if (synSet.getSynonym().getLiteral(i).getSense() < minSense){
                        minSense = synSet.getSynonym().getLiteral(i).getSense();
                        best = synSet;
                    }
                }
            }
        }
        return best;
    }
}