(() => {
  
  const appEl = document.querySelector("#app");
  
  const routes = {
    "": Home,
    "about": About,
  };
  
  const pushHandler = event => {
    let id = event.target.id;
    window.history.pushState({id}, `${id}`, `/${id}`);
  };
  
  const navigate = page => {
    appEl.innerHTML = routes[page] ? routes[page]() : "Page not found";
    [...document.querySelectorAll(".navigable")].forEach(el => 
      //el.removEventListener("click", e => {
      el.addEventListener("click", e => {
        console.log("navigation")
      })
    );
  };

  window.addEventListener("popstate", event => {
    let stateId = event.state.id;
   // load_content(id);
  });
  
  const path = window.location.href.split("/");
  const page = path[path.length-1];
  navigate(page);
  console.log(window.location.href)
  console.log(path)
  // window["contact"].addEventListener("click", event => push(event))
})();
