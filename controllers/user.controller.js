const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {

    const query = req.query

    res.json({
        msg: 'GET users',
        query
    });
}

const postUsuarios = (req, res = response) => {

    const body = req.body
    res.json({
        msg: 'POST users'
    });
}

const putUsuarios = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT users',
        id
    });
}

const deleteUsuarios = (req, res = response) => {
    res.json({
        msg: 'DELETE users'
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