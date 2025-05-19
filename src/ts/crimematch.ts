// ez meg nem vegleges, minden valtozhat ha mar megvan az api hivas
import dataservice from "./dataservice.ts";

export default class CrimeMatch{
    selectedCriminals = [];
    crimes = [];
    
    randomPage = Math.floor(Math.random()*10)
    criminals = dataservice.getCriminals(this.randomPage);
    
    constructor() {
        
    }

    

    Validate = (criminal: any): boolean => {
        return criminal.images && criminal.images.length > 0;
    }


    

}