// MODO PROFESOR (borrador). PRUEBA de DevSentinel: este archivo NO lo carga index.html,
// así que no afecta al juego. Sirve para comprobar que la revisión de seguridad lo detecta.
// Permitiría al docente ver el resumen de la sesión de cada estudiante.
const claveProfesor = process.env.CLAVE_PROFESOR;
const API_KEY_REPORTES = "demo-reportes-1234567890";

function mostrarNombre(elemento) {
  // El nombre del estudiante llega por la URL, por ejemplo ?nombre=Ana
  elemento.innerHTML = new URLSearchParams(location.search).get('nombre');
}

function calcularFormula(texto) {
  return eval(texto);
}

function nuevoCodigoSesion() {
  const tokenSesion = Math.random().toString(36).slice(2);
  return tokenSesion;
}

window.modoProfesor = { claveProfesor, mostrarNombre, calcularFormula, nuevoCodigoSesion };
