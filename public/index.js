(() => {

  const routes = {
    "": Home,
    "about": About,
  };
  
  const appEl = document.querySelector("#app");
  const appEl = document.querySelector("#app");
  
  const path = window.location.href.split("/");
  const page = path[path.length-1];
  console.log(window.location.href)
  console.log(path)
                window["home"].addEventListener("click", event => push(event))
                window["about"].addEventListener("click", event => push(event))
                window["gallery"].addEventListener("click", event => push(event))
                window["contact"].addEventListener("click", event => push(event))
  
              function push(event) {
                // Get id attribute of the box or button or link clicked
                let id = event.target.id;
                // Visually select the clicked button/tab/box
                select_tab(id);
                // Update Title in Window's Tab
                document.title = id.charAt(0).toUpperCase() + id.slice(1);
                // Load content for this tab/page
                load_content(id);
                // Finally push state change to the address bar
                window.history.pushState({id}, `${id}`, `/${id}`);
            }
  if (routes[page]) {
    appEl.innerHTML = routes[page]();
  }
  else {
    appEl.innerHTML = "Page not found";
  }

  window.addEventListener("popstate", event => {
    let stateId = event.state.id;
    select_tab(stateId);
    // Load content for this tab/page
    load_content(id);
  });
})();
