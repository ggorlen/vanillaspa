import GistsContainer from "./GistsContainer.js";
import Nav from "./Nav.js";
import {render} from "../renderer.js";

export default username => {
  const searchForm = `
    <div>
      <input placeholder="GitHub username" value="ggorlen" />
      <button>Find gists</button>
    </div>
  `;
  const getGists = (username, el) => 
    fetch(`https://api.github.com/users/${username}/gists`)
      .then(response => response.json())
      .then(data => {
        el.innerHTML = GistsContainer(data, username);
      })
      .catch(err => {
        el.innerHTML = `
          <p>
            Failed to retrieve gists for ${username}.
          </p>
          ${searchForm}
        `;
      })
  ;
  const template = document.createElement("div");
  template.innerHTML = `
    ${Nav()}
    <header>
      <h1>Gists</h1>
    </header>
    <main>
      ${username
        ? `<p>Retrieving gists for ${username}...</p>`
        : searchForm
      }
    </main>
  `;
  const mainEl = template.querySelector("main");
  
  if (username) {
    getGists(username, mainEl);
  }
  else {
    template
      .querySelector("button")
      .addEventListener("click", e => {
        const username = template.querySelector("input").value;
        render(`/gists/${username}`);
      })
    ;
  }
  
  return template;
};
