const Home = () => {
  fetch("https://api.github.com/gists/public")
    .then(res => res.json())
    .then(data => {
      const gistsEl = document.querySelector("#gists");
    
      // TODO find a better way to abort if nav occurred by the time the request gets back
      if (!gistsEl) return; 
    
      gistsEl.textContent = "";
      const ul = document.createElement("ul");
      gistsEl.appendChild(ul);
      data.forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${e.html_url}">${e.description || e.html_url}</a>`;
        ul.appendChild(li);
      });
    })
  ;
  
  return `
    ${Nav()}
    <header>
      <h1>home</h1>
    </header>
    <main>
      <p>Recent github gists:</p>
      <div id="gists">loading...</div>
    </main>
  `;
};
