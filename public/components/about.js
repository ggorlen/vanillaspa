import Nav from "./nav";

const About = () => {
  return `
    ${Nav()}
    <header>
      <h1>About</h1>
    </header>
    <main>
      <p>
        Just an experiment with <a href="http://vanilla-js.com/">🍦</a>
      </p>
    </main>
  `;
};

export default About;
