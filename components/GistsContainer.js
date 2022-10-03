import {mapJoin} from "../utils.js";

export default (gists, username) => `
  <p>
    Gists for ${username}:
  </p>
  <ul>
    ${mapJoin(gists, e => `
      <li>
        <a href="${e.html_url}">${e.description || e.id}</a>
      </li>
    `)}
  </ul>
`;
