// ez meg nem vegleges, minden valtozhat ha mar megvan az api hivas
import dataservice from "./dataservice.ts";
import { activeRandoms } from "./main.ts";

export default class CrimeMatch{
    /**
     *
     */

    constructor() {
        console.log(activeRandoms)
        this.DisplayImages();
    }

    DisplayImages(){
        const imgs = document.querySelectorAll(".image img") as NodeListOf<HTMLImageElement>;
        console.log(activeRandoms)
        console.log(imgs);
        for(let i = 0; i < 5; i++){
            imgs[i].src = activeRandoms[i].images.original;
        }
    }

}