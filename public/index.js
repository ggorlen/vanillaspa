(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts/:username": Posts, // TODO handle more complex routes
  };
  
  const renderRoute = path => {
    if (routes[path]) {
      return routes[path]();
    }
    else if (/:/.test(path)) {
      path = path.replace(/\/:.+/, "");
      return routes[path] ? routes[path](path.match(/:[^/$]+/)) : NotFound();
    }
    
    return NotFound();
  };
  
  const render = (rootEl, path) => {
    rootEl.innerHTML = renderRoute(path);
    
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
