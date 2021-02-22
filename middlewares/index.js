const validarCampos = require('./validar-campos.middleware');
const validarJWT = require('./validar-jwt.middleware');
const permisosRole = require('./validar-roles.middleware');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...permisosRole
}