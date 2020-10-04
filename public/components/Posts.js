const Posts = () => {
  const template = document.createElement("div");
  const username = new URL(window.location.href)
    .pathname.match(/(?<=posts\/)[^\/]+/);
  
  if (username) {
    setTimeout(() => {
      console.log()
      template.querySelector("main > p")
              .innerHTML = `
        <div>
          pretending to get posts for ${username} worked!
        </div>
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>baz</li>
        </ul>
        <button>click to sort the list above</button>
      `;
      template.querySelector("button")
        .addEventListener("click", e => {
          const ul = template.querySelector("ul");
          const children = [...ul.children]
            .sort((a, b) => a.textContent.localeCompare(b.textContent));
          ul.textContent = "";
          ul.append(...children);
        })
      ;
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
