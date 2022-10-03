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
        if (data.length) {
          el.innerHTML = GistsContainer(data, username);
        }
        else {
          el.innerHTML = `<p>${username} has no gists.</p>`;
        }
      })
      .catch(err => {
        el.innerHTML = `<p>Failed to retrieve gists for ${username}.</p>`;
      })
  ;
  const template = document.createElement("div");
  template.innerHTML = `
    ${Nav()}
    <header>
      <h1>Gists</h1>
    </header>
    <main>
      <div id="gist-search"></div>
      <div id="result">
        ${username ? `<p>Retrieving gists for ${username}...</p>` : ""}
      </div>
    </main>
  `;
  template.querySelector("#gist-search").append(GistSearch());
  
  if (username) {
    getGists(username, template.querySelector("#result"));
  }
  
  return template;
};
