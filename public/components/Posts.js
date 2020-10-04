const Posts = () => {
  const username = new URL(window.location.href)
    .pathname.match(/(?<=posts\/)[^\/]+/);
  
  const template = document.createElement("div");
  template.innerHTML = `
    ${Nav()}
    <header>
      <h1>Posts</h1>
    </header>
    <main>
      <p>
        ${username ? 
          `loading posts for ${username}...` :
          `try clicking <a href="/posts/greg">here</a> for a sample`
        }
      </p>
    </main>
  `;
  const pEl = template.querySelector("main > p");
  
  if (username) {
    setTimeout(() => {
      // TODO maybe return a promise and reject it if the page reloads.
      // or return/store references to any elements we care about in a systematic way.
      pEl && (pEl.innerHTML = `pretending to get posts for ${username} worked!`);
    }, 2000);
  }
  
  return template;
};
