const mapJoin = (a, cb) => a.map(cb).join("");
  
const setHTML = (el, html) => {
  if (typeof el === "string") {
    el = document.querySelector(el);
  }
  
  el && (el.innerHTML = html);
};

export {mapJoin, setHTML};
