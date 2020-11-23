import About from "./components/About.js";
import Home from "./components/Home.js";
import Gists from "./components/Gists.js";
import renderer from "./renderer.js";

(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/gists": Gists,
    // TODO "/gists/:username" format
  };
  renderer.initialize(document.querySelector("#app")routes);
  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    renderer.render(appEl, new URL(window.location.href).pathname);
  });
  renderer.render(appEl, new URL(window.location.href).pathname);
})();
