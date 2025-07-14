const materiasData = {
  "Historia de las Artes Audiovisuales 1": { correlativas: ["Historia de las Artes Audiovisuales 2"] },
  "Lenguaje Audiovisual 1": { correlativas: ["Historia de las Artes Audiovisuales 2","Lenguaje Audiovisual 2","Realización 1","Montaje 1"] },
  "Fotografía y Cámara 1": { correlativas: ["Fotografía y Cámara 2","Tecnología Digital"] },
  "Dibujo y sistemas de representación": { correlativas: [] },
  "Informática": { correlativas: [] },
  "Matemática": { correlativas: [] },
  "Lenguaje Audiovisual 2": { correlativas: ["Historia del Teatro Argentino","Historia del Teatro Universal"] },
  "Guión 1": { correlativas: ["Montaje 1","Guión 2"] },
  "Tecnología Digital": { correlativas: [] },
  "Física": { correlativas: ["Sonido 1"] },
  "Introducción a la Economía": { correlativas: [] },
  "Percepción Audiovisual": { correlativas: ["Dirección de Arte"] },
  "Trabajo Social Comunitario 1": { correlativas: ["Trabajo Social Comunitario 2"] },
  "Historia de las Artes Audiovisuales 2": { correlativas: ["Estética de los Medios","Sociología","Historia del Teatro Argentino","Historia del Teatro Universal"] },
  "Montaje 1": { correlativas: ["Montaje 2"] },
  "Realización 1": { correlativas: ["Dirección Actoral","Realización 2"] },
  "Fotografía y Cámara 2": { correlativas: ["Realización 2"] },
  "Sonido 1": { correlativas: ["Sonido 2"] },
  "Inglés": { correlativas: ["Inglés Técnico"] },
  "Lenguaje Musical": { correlativas: ["Diseño de Bandas Sonoras 1"] },
  "Guión 2": { correlativas: ["Guión 3"] },
  "Realización 2": { correlativas: ["Realización 3","Animación 2D","Mecánica del Movimiento Específica","Pixilatión","Stop Motion","Dirección de Arte y Efectos Especiales","Montaje y Tecnologías Especificas","Desarrollo de Proyectos Cinematográficos de Ficción","Realización Audiovisual Avanzada"] },
  "Sonido 2": { correlativas: ["Diseño de Bandas Sonoras 1"] },
  "Gestión y Producción 1": { correlativas: ["Gestión y Producción 2","Técnicas de Investigación de Audiencia"] },
  "Dirección de Arte": { correlativas: [] },
  "Trabajo Social Comunitario 2": { correlativas: ["Trabajo Social Comunitario 3"] },
  "Estética de los Medios": { correlativas: [] },
  "Sociología": { correlativas: ["Metodología de investigación","Deontología y Ejercicio Profesional"] },
  "Montaje 2": { correlativas: ["Nuevas tecnologías Audiovisuales","Montaje y Tecnologías Especificas","Motion Graphics"] },
  "Dirección Actoral": { correlativas: [] },
  "Realización 3": { correlativas: [] },
  "Gestión y Producción 2": { correlativas: ["Legislación","Desarrollo de Proyectos Cinematográficos de Ficción"] },
  "Inglés Técnico": { correlativas: [] },
  "Diseño de Bandas Sonoras 1": { correlativas: ["Nuevas tecnologías Audiovisuales"] },
  "Metodología de investigación": { correlativas: ["Trabajo Final 1: Proyecto de Tesis"] },
  "Guión 3": { correlativas: ["Taller de escritura de guiones de ficción"] },
  "Técnicas de Investigación de Audiencias": { correlativas: ["Trabajo Final 1: Proyecto de Tesis"] },
  "Legislación": { correlativas: ["Deontología y Ejercicio Profesional"] },
  "Trabajo Social Comunitario 3": { correlativas: ["Trabajo Social Comunitario 4"] },
  "Nuevas tecnologías Audiovisuales": { correlativas: [] },
  "Trabajo Final 1: Proyecto de Tesis": { correlativas: ["Trabajo Final 2: Realización y Defensa de Tesis"] },
  "Trabajo Social Comunitario 4": { correlativas: [] },
  "Final 2: Realización y Defensa de Tesis": { correlativas: [] },
  "Deontología y Ejercicio Profesional": { correlativas: [] },
  "Animación 2D": { correlativas: [] },
  "Mecánica del Movimiento Específica": { correlativas: [] },
  "Pixilatión": { correlativas: [] },
  "Stop Motion": { correlativas: [] },
  "Motion Graphics": { correlativas: [] },
  "Dirección de Arte y Efectos Especiales": { correlativas: [] },
  "Montaje y Tecnologías Especificas": { correlativas: [] },
  "Desarrollo de Proyectos Cinematográficos de Ficción": { correlativas: [] },
  "Taller de escritura de guiones de ficción": { correlativas: [] },
  "Realización Audiovisual Avanzada": { correlativas: [] },
  "Historia del Teatro Argentino": { correlativas: [] },
  "Historia del Teatro Universal": { correlativas: [] }
};

const estados = JSON.parse(localStorage.getItem("materiasVan")) || {};

function guardarEstado() {
  localStorage.setItem("materiasVan", JSON.stringify(estados));
}
function crearMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";
  Object.keys(materiasData).forEach(m => {
    const div = document.createElement("div");
    div.textContent = m;
    div.classList.add("materia");
    div.id = m;
    if (estados[m]) div.classList.add("completada");
    container.appendChild(div);
  });
  actualizarEstado();
}

function actualizarEstado() {
  Object.keys(materiasData).forEach(m => {
    const el = document.getElementById(m);
    if (!estados[m]) {
      // buscar si m está en correlativas de alguna aprobada
      const reqs = Object.entries(materiasData)
        .filter(([_, v]) => v.correlativas.includes(m))
        .map(([k]) => k);
      const habilitada = reqs.every(r => estados[r]);
      if (!habilitada) el.classList.add("bloqueada");
      else el.classList.remove("bloqueada");
    } else {
      el.classList.remove("bloqueada");
    }
  });
}

document.addEventListener("click", e => {
  if (!e.target.classList.contains("materia")) return;
  if (e.target.classList.contains("bloqueada")) return;
  const id = e.target.id;
  estados[id] = !estados[id];
  guardarEstado();
  crearMalla();
});

window.onload = crearMalla;
