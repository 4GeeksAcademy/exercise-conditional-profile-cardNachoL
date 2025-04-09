import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Cover
  let cover = "";
  if (variables.includeCover === false) {
    cover = "<div class='cover'></div>";
  } else {
    cover = `<div class="cover"><img src="${variables.background}"/></div>`;
  }

  // Social media list
  let links = [];
  if (variables.twitter) {
    links.push(
      `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    );
  }
  if (variables.github) {
    links.push(
      `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
    );
  }
  if (variables.linkedin) {
    links.push(
      `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    );
  }
  if (variables.instagram) {
    links.push(
      `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    );
  }

  let socialMedia = "";
  if (links.length > 0) {
    let position = "position-right";
    if (variables.socialMediaPosition === "position-left") {
      position = "position-left";
    }
    socialMedia = `<ul class="${position}">${links.join("")}</ul>`;
  }

  // Name / Role / Location
  const name = variables.name ? variables.name : "Lucy";
  const lastName = variables.lastName ? variables.lastName : "Boilett";
  const role = variables.role ? variables.role : "Web Developer";
  const city = variables.city ? variables.city : "Miami";
  const country = variables.country ? variables.country : "USA";

  // HTML render
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      ${socialMedia}
    </div>
  `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      const value = this.value;
      const values = {};

      if (value === "" || value === "null") {
        values[attribute] = null;
      } else if (value === "true") {
        values[attribute] = true;
      } else if (value === "false") {
        values[attribute] = false;
      } else {
        values[attribute] = value;
      }

      render(Object.assign(window.variables, values));
    });
  });
};
