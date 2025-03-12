function render(variables = {}) {
    console.log("📢 Renderizando con variables:", variables); // Depuración
  
    const {
      includeCover,
      background,
      avatarURL,
      socialMediaPosition,
      twitter,
      github,
      linkedin,
      instagram,
      name,
      lastName,
      role,
      country,
      city,
    } = variables;
  
    // 📌 Verificación de variables (Si alguna es `null`, usa un valor predeterminado)
    const fullName = `${name || "Lucy"} ${lastName || "Boilett"}`;
    const jobTitle = role || "Web Developer";
    const location = `${city || "Córdoba"}, ${country || "Spain"}`;
  
    // 📌 Determinar si la imagen de portada debe mostrarse
    const coverImage = includeCover
      ? `<div class="cover"><img src="${background || "https://via.placeholder.com/800x200"}" /></div>`
      : "";
  
    // 📌 Construcción de enlaces de redes sociales
    const socialLinks = `
      <ul class="position-${socialMediaPosition || "right"}">
        ${twitter ? `<li><a href="https://twitter.com/${twitter}" target="_blank"><i class="fa fa-twitter"></i></a></li>` : ""}
        ${github ? `<li><a href="https://github.com/${github}" target="_blank"><i class="fa fa-github"></i></a></li>` : ""}
        ${linkedin ? `<li><a href="https://linkedin.com/in/${linkedin}" target="_blank"><i class="fa fa-linkedin"></i></a></li>` : ""}
        ${instagram ? `<li><a href="https://instagram.com/${instagram}" target="_blank"><i class="fa fa-instagram"></i></a></li>` : ""}
      </ul>`;
  
    // 📌 Construcción del HTML
    document.querySelector("#widget_content").innerHTML = `
      <div class="widget">
        ${coverImage}
        <img src="${avatarURL || "https://via.placeholder.com/150"}" class="photo" />
        <h1>${fullName}</h1>
        <h2>${jobTitle}</h2>
        <h3>${location}</h3>
        ${socialLinks}
      </div>
    `;
  }
  
  // ✅ Inicializar variables globales
  window.variables = {
    includeCover: true,
    background: null,
    avatarURL: null,
    socialMediaPosition: "right",
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
  
  // ✅ Renderizar la tarjeta inicial
  render(window.variables);
  
  // ✅ Agregar event listeners (una sola vez)
  document.querySelectorAll(".picker").forEach(function (elm) {
    elm.addEventListener("input", function (e) {
      const attribute = e.target.dataset.variable;
      if (!attribute) return;
  
      // 🔥 ACTUALIZAR DIRECTAMENTE LAS VARIABLES GLOBALES
      window.variables[attribute] = e.target.value || null;
  
      console.log("🔄 Variable actualizada:", attribute, "=", window.variables[attribute]); // Depuración
  
      render(window.variables);
    });
  });