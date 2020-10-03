(() => {
  const routes = {
    "": Home,
    "about": About,
  };
  
  const back = a => a[a.length-1];
  
  const render = (el, page) => {
    el.innerHTML = routes[page] ? routes[page]() : NotFound();
    [...document.querySelectorAll(".navigable")].forEach(el => 
      el.addEventListener("click", e => {
        e.preventDefault();
        const href = e.target.href;
        window.history.pushState({href}, `${href}`, `/${href}`);
        render(el, href);
      })
    );
  };

  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    render(appEl, back(window.location.href.split("/")));
  });
  
  render(appEl, back(window.location.href.split("/")));
})();
