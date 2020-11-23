import About from "./components/About.js";
import Home from "./components/Home.js";
import Gists from "./components/Gists.js";
import render from "./render.js";

(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/gists": Gists,
    // TODO "/gists/:username" format
  };
  
  const appEl = document.querySelector("#app");
  window.addEventListener("popstate", e => {
    render(appEl, new URL(window.location.href).pathname);
  });
  
  render(appEl, new URL(window.location.href).pathname);
})();
