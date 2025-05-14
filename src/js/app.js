import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  let cover = "";
  if (variables.includeCover === false) {
    cover = "<div class='cover'></div>";
  } else {
    cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  }

  let links = [];
  if (variables.twitter) {
    links.push(
      `<li><a href="https://twitter.com/${variables.twitter}" target="_blank" title="@${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    );
  }
  if (variables.github) {
    links.push(
      `<li><a href="https://github.com/${variables.github}" target="_blank" title="@${variables.github}"><i class="fab fa-github"></i></a></li>`
    );
  }
  if (variables.linkedin) {
    links.push(
      `<li><a href="https://linkedin.com/in/${variables.linkedin}" target="_blank" title="@${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    );
  }
  if (variables.instagram) {
    links.push(
      `<li><a href="https://instagram.com/${variables.instagram}" target="_blank" title="@${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    );
  }

  let socialMedia =
    links.length > 0 ? `<ul class="social-inline">${links.join("")}</ul>` : "";

  const name = variables.name || "Lucy";
  const lastName = variables.lastName || "Boilett";
  const role = variables.role || "Web Developer";
  const city = variables.city || "Miami";
  const country = variables.country || "USA";
  const avatar = variables.avatarURL || "https://via.placeholder.com/100";
  const widgetClass =
    variables.includeCover === false ? "widget no-cover" : "widget";

  document.querySelector("#widget_content").innerHTML = `
    <div class="${widgetClass}">
      ${cover}
      <img src="${avatar}" class="photo" />
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

      values[attribute] =
        value === "" || value === "null"
          ? null
          : value === "true"
          ? true
          : value === "false"
          ? false
          : value;

      render(Object.assign(window.variables, values));
    });
  });
};
