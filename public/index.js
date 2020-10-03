(() => {

const routes = {
  "": Home,
  "about": About,
};

const appEl = document.querySelector("#app");

const path = window.location.href.split("/");
const page = 
console.log(window.location.href)
console.log(path)

appEl.innerHTML = Home();

})();
