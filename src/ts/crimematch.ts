// ez meg nem vegleges, minden valtozhat ha mar megvan az api hivas
import type Criminal from "./criminal.ts";
import dataservice from "./dataservice.ts";
import { GetActiveRandoms } from "./main.ts";


export default class CrimeMatch{
    /**
     *
     */
    criminals: Criminal[]= [];
    crimeList: string[]= [];
    constructor() {
        // console.log(activeRandoms)
        this.Initialize();
        document.querySelectorAll(".drop-zone")
      document.querySelectorAll(".box-rnd")
        .forEach(el => el.addEventListener("dragstart", this.dragstartHandler));
    document.querySelectorAll(".drop-zone")
        .forEach(zone => {
          zone.addEventListener("dragover", this.dragoverHandler);
          zone.addEventListener("drop", this.dropHandler);
        });
    }
    
    async Initialize(){
        this.criminals= await GetActiveRandoms();
        this.DisplayImages();
        this.RandomizeCrimes();
    }

    

    RandomizeCrimes(){
        const crimes = document.querySelectorAll(".box-rnd") as NodeListOf<HTMLDivElement>;
        this.criminals.forEach(c => {
            this.crimeList.push(c.crime);
        })
        const shuffledCrimes = this.crimeList.sort((a, b) => 0.5 - Math.random());
        for(let i = 0; i < crimes.length; i++){
            // console.log(shuffledCrimes[i]);
            crimes[i].innerHTML = `<p >${shuffledCrimes[i]}</p>`;
        }
    }

    DisplayImages(){
        const imgs = document.querySelectorAll(".image img") as NodeListOf<HTMLImageElement>;
        console.log("képek: " + imgs);
        console.log("faszok: " + this.criminals)
        for(let i = 0; i < imgs.length; i++){
            console.log("Aktuális fasz: " + this.criminals[i])
            console.log("faszindex: " + i)
            imgs[i].src = this.criminals[i].img
        }
    }
    dragstartHandler(e:any) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
  dragoverHandler(e:any) {
    e.preventDefault();
  }
  dropHandler(e:any) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const dragged = document.getElementById(id);
    if (dragged) {
      e.currentTarget.appendChild(dragged);
    }
  }

    

}