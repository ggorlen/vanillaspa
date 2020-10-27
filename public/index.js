import About from "./components/About.js";
import Home from "./components/Home.js";
import NotFound from "./components/NotFound.js";
import Posts from "./components/Posts.js";

(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts": Posts,
  };
  
  const render = (rootEl, path) => {
    const chunks = path.split("/");
    const resource = chunks.length > 2 ? chunks.pop() : null; // TODO unused
    const page = chunks.join("/");
    const toRender = routes[page] ? routes[page]() : NotFound();
    
    // A component can return either a template string or a DOM element
    if (typeof toRender === "string") {
      rootEl.innerHTML = toRender;
    }
    else {
      rootEl.textContent = "";
      rootEl.appendChild(toRender);
    }
    
    // Find all of the links that begin with `/` and plug them into the router
    document.querySelectorAll('[href^="/"]').forEach(el => 
      el.addEventListener("click", evt => {
        evt.preventDefault();
        const pathname = new URL(evt.target.href).pathname;
        window.history.pushState({pathname}, pathname, pathname);
        render(rootEl, pathname);
      })
    );
  };

  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    render(appEl, new URL(window.location.href).pathname);
  });
  
  render(appEl, new URL(window.location.href).pathname);
})();
