import Nav from "./nav";
import PostsContainer from "./posts-container";

const Posts = () => {
  const template = document.createElement("div");
  const username = new URL(window.location.href)
    .pathname.match(/(?<=posts\/)[^\/]+/);
  
  if (username) {
    (new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(["bar", "baz", "foo", "quux"]);
      }, 2000);
    }))
    .then(data => {
      const mainEl = template.querySelector("main");
      mainEl.textContent = "";
      mainEl.append(PostsContainer(data, username));
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

export default Posts;
