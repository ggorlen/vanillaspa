import {redirect} from "../renderer.js";

export default () => {
  const searchForm = document.createElement("form");
  searchForm.innerHTML = `
    <input placeholder="GitHub username" value="ggorlen" />
    <input type="submit" value="Find gists" />
  `;
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    redirect(`/gists/${e.target.elements[0]}`);
  });
  return searchForm;
};
