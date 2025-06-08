import {redirect} from "../Router.js";

export default () => {
  const searchForm = document.createElement("form");
  searchForm.innerHTML = `
    <input placeholder="GitHub username" />
    <input type="submit" value="Find gists" />
  `;
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = e.target.elements[0].value
    username && redirect(`/vanillaspa/gists/${username}`);
  });
  return searchForm;
};
