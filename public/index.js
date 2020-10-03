(() => {
  const back = a => a[a.length-1];
  const appEl = document.querySelector("#app");
  
  const routes = {
    "": Home,
    "about": About,
  };
  
  const navigate = page => {
    appEl.innerHTML = routes[page] ? routes[page]() : NotFound();
    [...document.querySelectorAll(".navigable")].forEach(el => 
      el.addEventListener("click", e => {
        e.preventDefault();
        const dest = e.target.dataset.nav;
        window.history.pushState({dest}, `${dest}`, `/${dest}`);
        navigate(dest);
      })
    );
  };

  window.addEventListener("popstate", e => {
    navigate(back(window.location.href.split("/")));
  });
  
  navigate(back(window.location.href.split("/")));
})();
