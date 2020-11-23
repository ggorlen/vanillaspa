export default (gists, username) => `
  <div>
    Gists for ${username}:
  </div>
  <ul>
    ${gists.map(e => `
      <li>
        <a href="${e.html_url}">${e.description || e.id}</a>
      </li>
    `).join("")}
  </ul>
`;
