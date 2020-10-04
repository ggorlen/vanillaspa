(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts": Posts, 
  };
  
  const render = (rootEl, path) => {
    const page = path.match(/\/[^\/]*/g)[0];
    //rootEl.children[0] && rootEl.children[0].remove();
    //rootEl.appendChild(routes[page] ? routes[page]() : NotFound());
    rootEl.innerHTML = (routes[page] ? routes[page]() : NotFound());
    
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
