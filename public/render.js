import NotFound from "./components/NotFound.js";

const render = (rootEl, path, routes) => {
  const chunks = path.split("/");
  const resource = chunks.length > 2 ? chunks.pop() : undefined;
  const page = chunks.join("/");
  const toRender = routes[page] ? routes[page](resource) : NotFound();
  
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
      const {pathname} = new URL(evt.target.href);
      window.history.pushState({pathname}, pathname, pathname);
      render(rootEl, pathname);
    })
  );
};

export default render;