import Nav from "./nav.js";

const NotFound = () => {
  return `
    ${Nav()}
    <header>
      <h1>Page not found</h1>
    </header>
    <main>
    </main>
  `;
};

export default NotFound;
