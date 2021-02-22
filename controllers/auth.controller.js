const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                logged: false,
                msg: 'El usuario no es correcto'
            })
        }

        if (usuario.estado == false) {
            return res.status(400).json({
                logged: false,
                msg: 'El usuario está desactivado'
            })
        }

        const validPass = bcryptjs.compareSync(password, usuario.password);

        if (!validPass) {
            return res.status(400).json({
                logged: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            logged: true,
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            logged: false,
            msg: "Hable con el administrador"
        });
    }
}

module.exports = {
    login
}