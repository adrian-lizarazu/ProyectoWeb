const { getActiveUser } = require("../../authState");

function responderCuestionario() {
  rolActual = getActiveUser();
  if (rolActual == "Inactivo") {
    return console.log(
      "Error: Inicie sesión en su cuenta de estudiante para poder responder cuestionarios"
    );
  }
  if (rolActual !== "Estudiante") {
    return console.log(
      "Error: un " +
        rolActual +
        " no puede responder cuestionarios. Solo estudiantes"
    );
  }
  console.log("\n Cuestionario respondido correctamente. \n");
}

responderCuestionario();
module.exports = { responderCuestionario };
