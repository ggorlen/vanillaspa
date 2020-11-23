import About from "./components/About.js";
import Home from "./components/Home.js";
import Gists from "./components/Gists.js";
import NotFound from "./components/NotFound.js";
import Router, {render} from "./Router.js";

(() => {
  const routes = {
    "/": Home,
    "/about": About,
    "/gists": Gists,
    // TODO "/gists/:username" format support
  };
  Router.init(document.querySelector("#app"), routes, NotFound);
  window.addEventListener("popstate", e => {
    render(new URL(window.location.href).pathname);
  });
  render(new URL(window.location.href).pathname);
})();
