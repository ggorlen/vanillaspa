const Post = (posts, username) => {
  const template = document.createElement("div");
  template.innerHTML = `
    <div>
      pretending to get posts for ${username} worked!
    </div>
    <ul>
      ${posts.map(e => `<li>${e}</lI>`).join("")}
    </ul>
    <button>click to sort the list above</button>
  `;
  const ul = template.querySelector("ul");
  let ascending = true;
  
  template
    .querySelector("button")
    .addEventListener("click", e => {
      ascending = !ascending;
      const children = [...ul.children].sort((a, b) => 
        a.textContent.localeCompare(b.textContent) * (ascending ? 1 : -1)
      );
      ul.textContent = "";
      ul.append(...children);
    })
  ;
  
  return template;
};