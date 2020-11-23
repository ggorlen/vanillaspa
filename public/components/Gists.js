import GistsContainer from "./GistsContainer.js";
import Nav from "./Nav.js";

export default username => {
  const template = document.createElement("div");
  template.innerHTML = `
    ${Nav()}
    <header>
      <h1>Gists</h1>
    </header>
    <main>
      <div>
        <input placeholder="GitHub username" value="ggorlen" />
        <button>Find gists</button>
      </div>
    </main>
  `;
  const mainEl = template.querySelector("main");
  
  if (username) {
    fetch(`https://api.github.com/users/${username}/gists`)
      .then(response => response.json())
      .then(data => {
        mainEl.innerHTML = GistsContainer(data, username);
      })
      .catch(err => {
        mainEl.innerHTML = `failed to retrieve gists for ${username}`;
      })
    ;
  }
  
  return template;
};
