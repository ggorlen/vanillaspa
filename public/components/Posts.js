const Posts = () => {
  const username = new URL(window.location.href)
    .pathname.match(/(?<=posts\/).+$/);
  
  if (username) {
    setTimeout(() => {
      
      // TODO upon navigation away, this could point to the wrong thing.
      // can use ids but this is pretty restrictive, we should 
      // return a promise and reject it if the page reloads.
      const el = document.querySelector("main > p"); 
      el && (el.innerHTML = "it worked!");
    }, 2000);
  }
  
  return `
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
};
