import dataservice from "./dataservice";

const rootDiv = document.querySelector('#app') as HTMLDivElement;
const navbarItems = document.querySelectorAll<HTMLAnchorElement>('a[data-href]');
const activeRandoms = [];

const PAGES = '/pages/';

interface Route {
  page: string;
  code?: new () => any;
}

const routes: Record<string, Route> = {
  '/': { page: 'home.html', code: undefined },
  '/main': { page: 'maingame.html', code: undefined },
  '/challange': { page: 'challangegame.html', code: undefined },
};

// a dataservice.getCriminals(?) <= ide kell randomot generálni majd a min és max között, alapértelmezett oldalszám 1
// images.original a kép
// description a ok amiért bent van


dataservice.getCriminals().then((criminals) => {
  for (let i = 0; i < 5; i++) {
    const criminal = criminals.items[i];
    if (Validate(criminal)) {
      activeRandoms.push(criminal);
    }
  }
});

const Validate = (criminal: any): boolean => {
  return criminal.title && criminal.images && criminal.images.length > 0;
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
