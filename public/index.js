(() => {
  const back = a => a[a.length-1];
  const routes = {
    "": Home,
    "about": About,
  };
  
  const render = (rootEl, page) => {
    rootEl.innerHTML = routes[page] ? routes[page]() : NotFound();
    [...document.querySelectorAll(".navigable")].forEach(el => 
      el.addEventListener("click", e => {
        e.preventDefault();
        const href = e.target.dataset.nav;
        window.history.pushState({href}, `${href}`, `/${href}`);
        render(rootEl, href);
      })
    );
  };

  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    render(appEl, back(window.location.href.split("/")));
  });
  
  render(appEl, back(window.location.href.split("/")));
})();
