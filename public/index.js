(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts": Posts, // TODO add /posts/:username or more complex resource paths
  };
  
  const renderRoute = path => {
    const chunks = path.match(/\/[^\/]*/g); // TODO see above
    const [page, resId] = chunks;
    return routes[page] ? routes[page]((resId || "").slice(1)) : NotFound();
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
