import type Criminal from "./criminal.ts";
import { GetActiveRandoms } from "./main.ts";

export default class CrimeMatch {
  criminals: Criminal[] = [];
  crimeList: string[] = [];
  constructor() {
    this.Initialize();
    document.querySelectorAll(".drop-zone");
    document.querySelectorAll(".box-rnd").forEach((el) => el.addEventListener("dragstart", this.dragstartHandler));
    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.addEventListener("dragover", this.dragoverHandler);
      zone.addEventListener("drop", this.dropHandler);
    });
    document.querySelector("#guess_btn")?.addEventListener("click", this.CheckMatches.bind(this));
  }

  async Initialize() {
    this.criminals = await GetActiveRandoms();
    this.DisplayImages();
    this.RandomizeCrimes();
  }

  RandomizeCrimes() {
    const crimes = document.querySelectorAll(".box-rnd") as NodeListOf<HTMLDivElement>;
    this.criminals.forEach((c) => {
      this.crimeList.push(c.crime);
    });
    const shuffledCrimes = this.crimeList.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < crimes.length; i++) {
      crimes[i].innerHTML = `<p >${shuffledCrimes[i]}</p>`;
    }
  }

  DisplayImages() {
    const imgs = document.querySelectorAll(".image img") as NodeListOf<HTMLImageElement>;
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = this.criminals[i].img;
    }
  }
  dragstartHandler(e: any) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
  dragoverHandler(e: any) {
    e.preventDefault();
  }
  dropHandler(e: any) {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const dragged = document.getElementById(id);
    if (e.currentTarget.children.length == 0) {
      if (dragged) {
        e.currentTarget.appendChild(dragged);
      }
    }
  }

  CheckMatches() {
    let matchCount: number = 0;
    const zones: NodeListOf<HTMLDivElement> = document.querySelectorAll(".guess-zone");
    for (let i = 0; i < zones.length; i++) {
      if (zones[i].children[0] != undefined) {
        let desc: string = zones[i].children[0].children[0].innerHTML.trim().toLowerCase().replace(/\s+/g, "");

        const description = this.criminals[i].crime.trim().toLowerCase().replace(/\s+/g, "");

        if (description == desc) {
          zones[i].parentElement!.style.backgroundColor = "green";
          matchCount++
        } else {
          zones[i].parentElement!.style.backgroundColor = "red";

        }
      }
    }
    if (matchCount != 5) return;
    (document.querySelector("#msg-div") as HTMLDivElement).innerHTML =
      "<h3 class='text-center'>Your matches are correct!</h3><br><a href='' class='text-4xl bg-blue-900 rounded-2xl px-6 py-2 font-bold hover:text-gray-400'>New challange</a>";
  }
}
