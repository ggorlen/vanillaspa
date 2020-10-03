(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts": Posts, // TODO add /posts/:username
  };
  
  const renderRoute = path => {
    const chunks = [...path.matchAll(/\/[^\/]*/g)]; // TODO see above
    const resId = chunks[1];
    const page = chunks[0];
    return routes[page] ? routes[page](resId) : NotFound();
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
