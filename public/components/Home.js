import Nav from "./Nav.js";
import {mapJoin, setHTML} from "../utils.js";

export default () => {
  fetch("https://api.github.com/gists/public")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    
      throw Error(`Unable to fetch gists [${res.status}]`);
    })
    .then(data => {
      // filter out spammy gists
      data = data.filter(e => 
        !e.description || 
        !e.description.match(/Skills|untrusted|rimworld|LL:\d/gi)
      );
      setHTML("#gists", `
        <ul>${mapJoin(data, e => `
          <li>
            <a href="${e.html_url}">
              ${e.description || e.html_url}
            </a>
          </li>
        `)}
        </ul>
      `);
    })
    .catch(err => setHTML("#gists", `<p>${err}</p>`))
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
