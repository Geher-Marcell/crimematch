import { activeRandoms } from "./main";

export default class Criminal{
    crime = "";
    img = "";

    
    constructor(criminal: any) {
        this.crime = criminal.description;
        this.img = criminal.images[0].original;
    }
}