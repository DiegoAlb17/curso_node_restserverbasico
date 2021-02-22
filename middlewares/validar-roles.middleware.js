const { response, request } = require('express');

const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token'
        });
    }

    const { role } = req.usuario;

    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Rol no valido'
        });
    }
}

const permisosRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: 'No tienes permisos para realizar esta acción'
            });
        }

        next();
    }
}

module.exports = { esAdminRole, permisosRole }