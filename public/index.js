(() => {
  const routes = {
    "/": Home,
    "/about": About,
    //"/posts/:username": Posts, // TODO
  };
  
  const render = (rootEl, page) => {
    rootEl.innerHTML = routes[page] ? routes[page]() : NotFound();
    document.querySelectorAll(".navigable").forEach(el => 
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
