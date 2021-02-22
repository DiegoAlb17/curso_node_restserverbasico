const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    });
}

const postUsuarios = async(req, res = response) => {

    const { nombre, password, correo, role } = req.body;
    const usuario = new Usuario({ nombre, password, correo, role });

    //Encriptamos la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const putUsuarios = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //Encriptamos la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuarioDB
    });
}

const deleteUsuarios = async(req, res = response) => {
    const { id } = req.params;

    const usuarioDB = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({
        usuarioDB,
        usuarioAutenticado
    });
}

const patchUsuarios = (req, res = response) => {
    res.json({
        msg: 'PATCH users'
    });
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}