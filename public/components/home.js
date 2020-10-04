import Nav from "./nav.js";

const Home = () => {
  fetch("https://api.github.com/gists/public")
    .then(res => res.json())
    .then(data => {
      const gistsEl = document.querySelector("#gists");
    
      if (!gistsEl) return; 
    
      gistsEl.textContent = "";
      const ul = document.createElement("ul");
      gistsEl.appendChild(ul);
      data.forEach(e => {
        const li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `
          <a href="${e.html_url}">${e.description || e.html_url}</a>
        `;
      });
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

export default Home;
