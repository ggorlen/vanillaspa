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
          el.innerHTML = 'GistsContainer(data, username);
        }
        
        el.innerHTML = `<p>${username} has no gists.</p>`;
        el.append(GistSearch());
      })
      .catch(err => {
        el.innerHTML = `<p>Failed to retrieve gists for ${username}.</p>`;
        el.append(GistSearch());
      })
  ;
  const template = document.createElement("div");
  template.innerHTML = `
    ${Nav()}
    <header>
      <h1>Gists</h1>
    </header>
    <main>
      <p>Retrieving gists for ${username}...</p>
    </main>
  `;
  
  if (username) {
    getGists(username, template.querySelector("main"));
  }
  else {
    const mainEl = template.querySelector("main");
    mainEl.innerHTML = "";
    mainEl.append(GistSearch());
  }
  
  return template;
};
