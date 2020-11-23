import NotFound from "./components/NotFound.js";
/*
class Renderer {
  constructor(rootEl, routes) {
    this.rootEl = rootEl;
    this.routes = routes;
  }
}*/
let rootEl;
let routes;
const render = path => {
    const chunks = path.split("/");
    const resource = chunks.length > 2 ? chunks.pop() : undefined;
    const page = chunks.join("/");
  console.log(path, page,routes)
    const toRender = routes[page] 
      ? routes[page](resource)
      : NotFound()
    ;
    
    // A component can return either a template string or a DOM element
    if (typeof toRender === "string") {
      rootEl.innerHTML = toRender;
    }
    else {
      rootEl.textContent = "";
      rootEl.appendChild(toRender);
    }
    
    // Find all of the links that begin with `/` and plug them into the router
    rootEl.querySelectorAll('[href^="/"]').forEach(el => 
      el.addEventListener("click", evt => {
        evt.preventDefault();
        const {pathname} = new URL(evt.target.href);
        window.history.pushState({pathname}, pathname, pathname);
        render(pathname);
      })
    );
  }
export default {
  initialize: (rootEl0, routes0) => {
    rootEl = rootEl0;
    routes = routes0;
  },
 render 
};
