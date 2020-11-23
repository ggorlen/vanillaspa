import GistsContainer from "./GistsContainer.js";
import GistSearch from "./GistSearch.js";
import Nav from "./Nav.js";

export default username => {
  const getGists = (username, el) => 
    fetch(`https://api.github.com/users/${username}/gists`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        
        throw Error(`Fetch failed [${response.status}]`)
      })
      .then(data => {
        el.innerHTML = data.length 
          ? GistsContainer(data, username)
          : `<p>${username} has no gists.</p>${GistSearch()}`
        ;
      })
      .catch(err => {
        el.innerHTML = `
          <p>Failed to retrieve gists for ${username}.</p>
          ${GistSearch()}
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
        : GistSearch()
      }
    </main>
  `;
  
  if (username) {
    getGists(username, template.querySelector("main"));
  }
  
  return template;
};
