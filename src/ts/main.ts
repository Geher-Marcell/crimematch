import dataservice from "./dataservice";
import CrimeMatch from "./crimematch";
import Criminal from "./criminal";

const rootDiv = document.querySelector('#app') as HTMLDivElement;
const navbarItems = document.querySelectorAll<HTMLAnchorElement>('a[data-href]');
export const activeRandoms: any = [];
const randomPage = Math.floor(Math.random()*7)
// console.log(randomPage);
const PAGES = '/pages/';

const imgs = document.querySelectorAll(".image");
// console.log(imgs);
interface Route {
  page: string;
  code?: new () => any;
}

const routes: Record<string, Route> = {
  '/': { page: 'home.html', code: undefined },
  '/main': { page: 'maingame.html', code: CrimeMatch },
  '/challange': { page: 'maingame.html', code: undefined },
};

// a dataservice.getCriminals(?) <= ide kell randomot generálni majd a min és max között, alapértelmezett oldalszám 1
// images.original a kép
// description a ok amiért bent van

export async function GetActiveRandoms( ){
  await dataservice.getCriminals(randomPage).then((criminals) => {
  while(activeRandoms.length != 5){
    const criminal = criminals.items[Math.floor(Math.random()*16)];
    // console.log(criminal);
    if (Validate(criminal)) {
      let c = new Criminal(criminal);
      // console.log(c);
      //TODO: ketszer rakja bele a listaba, kell a fix
      if(!activeRandoms.includes(c)){
        activeRandoms.push(c);
        // console.log(activeRandoms);
      }
    }
  }
});
return activeRandoms;
}

// console.log(activeRandoms)

const Validate = (criminal: any): boolean => {
  return criminal.images && criminal.images.length > 0 && criminal.description != "";
}

const loadPage = async (page: string): Promise<string> => {
  const response = await fetch(PAGES + page);
  const resHtml = await response.text();
  return resHtml;
};

const dynamicClass = (CodeClass?: new () => void): void => {
  if (CodeClass) {
    new CodeClass();
  }
};

const onNavClick = async (event: MouseEvent): Promise<void> => {
  event.preventDefault();
  const target = event.target as HTMLAnchorElement;
  const pathName = target.dataset.href as string;
  window.history.pushState({}, '', pathName);
  const data = await loadPage(routes[pathName].page);
  rootDiv.innerHTML = data;
  dynamicClass(routes[pathName]?.code);
};

window.addEventListener('load', async () => {
  const pathName = window.location.pathname;
  const data = await loadPage(routes[pathName].page);
  rootDiv.innerHTML = data;
  dynamicClass(routes[pathName].code);
});

window.addEventListener('popstate', async () => {
  const pathName = window.location.pathname;
  const data = await loadPage(routes[pathName].page);
  rootDiv.innerHTML = data;
  dynamicClass(routes[pathName].code);
});

navbarItems.forEach(navItem => {
  navItem.addEventListener('click', onNavClick);
});
