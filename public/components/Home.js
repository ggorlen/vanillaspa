const Home = () => {
  fetch("https://api.github.com/gists/public")
    .then(res => res.json())
    .then(data => {
      const gistsEl = document.querySelector("#gists");
      data.forEach(e => gistsEl.e)
    })
  ;
  
  return `
    ${Header()}
    <h1>home</h1>
    <main>
      <p>Recent github gists:</p>
      <div id="gists">loading...</div>
    </main>
  `;
};
