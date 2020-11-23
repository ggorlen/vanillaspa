import GistsContainer from "./GistsContainer.js";
import Nav from "./Nav.js";
import {redirect} from "../renderer.js";

export default username => {
  const searchForm = `
    <form>
      <input placeholder="GitHub username" value="ggorlen" />
      <input type="submit" value="Find gists" />
    </form>
  `;
  const getGists = (username, el) => 
    fetch(`https://api.github.com/users/${username}/gists`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        
        throw Error(`Fetch failed ${response.status}`)
      })
      .then(data => {
        el.innerHTML = data.length 
          ? GistsContainer(data, username)
          : `<p>${username} has no gists</p>`
        ;
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `
          <p>Failed to retrieve gists for ${username}.</p>
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
  
  if (username) {
    getGists(username, template.querySelector("main"));
  }
  else {
    template
      .querySelector("form")
      .addEventListener("submit", e => {
        const username = template.querySelector("input").value;
        redirect(`/gists/${username}`);
      })
    ;
  }
  
  return template;
};
