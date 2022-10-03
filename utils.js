const makeEl = document.createElement;

const esc = s => s; // TODO escape HTML

const mapJoin = (a, cb) => a.map(cb).join("");
  
const setHTML = (el, html) => {
  if (typeof el === "string") {
    el = document.querySelector(el);
  }
  
  el && (el.innerHTML = html);
};

export {esc, mapJoin, setHTML};
