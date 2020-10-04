
const Posts = () => {
  const template = document.createElement("div");
  const username = new URL(window.location.href)
    .pathname.match(/(?<=posts\/)[^\/]+/);
  
  if (username) {
    setTimeout(() => {
      template.querySelector("main Posts(["bar", "baz", "foo", "quux"], username);
    }, 2000);
  }
  
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
  return template;
};
