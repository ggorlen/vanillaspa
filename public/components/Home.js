import Nav from "./Nav.js";

export default () => {
  fetch("https://api.github.com/gists/public")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    
      throw Error(`Unable to fetch gists [${res.status}]`);
    })
    .then(data => {
      const gistsEl = document.querySelector("#gists");
    
      if (!gistsEl) return;
    
      gistsEl.innerHTML = `
        <ul>${data.map(e => `
          <li>
            <a href="${e.html_url}">
              ${e.description || e.html_url}
            </a>
          </li>
        `).join("")}
        </ul>
      `;
    })
    .catch(err => {
      const gistsEl = document.querySelector("#gists");
    
      if (!gistsEl) return;
    
      gistsEl.innerHTML = `<p>${err}</p>`;
    })
  ;
  
  return `
    ${Nav()}
    <header>
      <h1>Home</h1>
    </header>
    <main>
      <p>Recently published GitHub gists:</p>
      <div id="gists">loading...</div>
    </main>
  `;
};
