const Posts = username => {
  if (username) {
    setTimeout(() => {
      
      // TODO we really should make sure this elem is part of our 
      // page and not some other main > p ...
      // ... can use ids but maybe there's a better approach
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
