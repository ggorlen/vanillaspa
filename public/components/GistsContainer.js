export default (gists, username) => `
  <p>
    Gists for ${username}:
  </p>
  <ul>
    ${gists.map(e => `
      <li>
        <a href="${e.html_url}">${e.description || e.id}</a>
      </li>
    `).join("")}
  </ul>
`;
