(() => {
  const back = a => a[a.length-1];
  const routes = {
    "": Home,
    "about": About,
  };
  
  const parseLocation = () => {
    const url = new URL(window.location.href);
    const path = url.pathname.split("/").filter(Boolean);
    // TODO follow REST resource resource/id format and disallow leading garbage
    return back(path) || ""; 
  };
  
  const render = (rootEl, page, resource) => {
    rootEl.innerHTML = routes[page] ? routes[page]() : NotFound();
    [...document.querySelectorAll(".navigable")].forEach(el => 
      el.addEventListener("click", e => {
        e.preventDefault();
        const href = e.target.dataset.nav; // TODO allow resource/id
        window.history.pushState({href}, href, `/${href}`);
        render(rootEl, href);
      })
    );
  };

  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    render(appEl, parseLocation());
  });
  
  render(appEl, parseLocation());
})();
