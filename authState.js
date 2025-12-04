let activeUserRole = "Administrador";

const ROLES_VALIDOS = ["Administrador", "Editor", "Estudiante", "Inactivo"];

function setActiveUser(role) {
  if (!ROLES_VALIDOS.includes(role)) {
    throw new Error(
      `Rol inválido: "${role}". Los roles permitidos son: ${ROLES_VALIDOS.join(
        ", "
      )}`
    );
  }

  activeUserRole = role;
}

function getActiveUser() {
  return activeUserRole;
}

module.exports = { setActiveUser, getActiveUser, ROLES_VALIDOS };
