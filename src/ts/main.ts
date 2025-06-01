import dataservice from "./dataservice";
import CrimeMatch from "./crimematch";
import Criminal from "./criminal";

export const activeRandoms: any = [];
const rootDiv = document.querySelector('#app') as HTMLDivElement;
const navbarItems = document.querySelectorAll<HTMLAnchorElement>('a[data-href]');
const randomPage = Math.floor(Math.random() * 7)

const PAGES = '/pages/';

interface Route {
  page: string;
  code?: new () => any;
}

const routes: Record<string, Route> = {
  '/': { page: 'home.html', code: undefined },
  '/main': { page: 'maingame.html', code: CrimeMatch },
};


export async function GetActiveRandoms() {
  await dataservice.getCriminals(randomPage).then((criminals) => {
    while (activeRandoms.length != 5) {
      const criminal = criminals.items[Math.floor(Math.random() * 16)];
      if (Validate(criminal)) {
        let c = new Criminal(criminal);
        console.log(c);
        if (!activeRandoms.some((existing: Criminal) => existing.img === c.img)) {
          activeRandoms.push(c);
        }
      }
    }
  });
  return activeRandoms;
}

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
