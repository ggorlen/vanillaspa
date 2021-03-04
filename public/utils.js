const setHTML = (el, html) => {
  if (typeof el === "string") {
    el = document.querySelector(el);
  }
  
  el && (el.innerHTML = html);
};

export {setHTML};
