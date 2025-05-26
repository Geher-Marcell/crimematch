export default class Criminal{
    crime = "";
    img = "";

    
    constructor(criminal: any) {
        let crimes = criminal.description.split(";")[0].split(',')[0];
        if(crimes.length >= 20) this.crime = crimes;
        else this.crime = criminal.description.split(";")[0];
        this.img = criminal.images[0].original;
    }
}