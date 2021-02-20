const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({ rol: role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la BBDD`);
    }
}

const emailExiste = async(correo = '') => {
    const existeMail = await Usuario.findOne({ correo });
    if (existeMail) {
        throw new Error(`El correo ya esta registrado en la BBDD`);
    }
}

const existeUsuarioById = async(id = '') => {
    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`No existe un usuario con ese ID`);
    }
}

module.exports = { esRoleValido, emailExiste, existeUsuarioById }