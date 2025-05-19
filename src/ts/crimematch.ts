// ez meg nem vegleges, minden valtozhat ha mar megvan az api hivas

export default class CrimeMatch{
    criminals = [];
    selectedCriminals = [];
    crimes = [];
    constructor() {
        
    }

    GetFiveCriminals(){
        while(this.criminals.length !=5){
            let random: number = Math.floor(Math.random()* this.criminals.length) as number;
            if(!this.selectedCriminals.includes(this.criminals[random])) this.selectedCriminals.push(this.criminals[random]);
        }
    }

    

}