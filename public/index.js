(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/posts": Posts, 
  };
  
  const render = (rootEl, path) => {
    const page = path.match(/\/[^\/]*/g)[0];
    const toRender = routes[page] ? routes[page]() : NotFound();
    
    if (typeof toRender === "string") {
      rootEl.innerHTML = toRender;
    }
    else {
      rootEl.textContent = "";
      rootEl.appendChild(toRender);
    }
    
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
