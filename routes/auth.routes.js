const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();

router.post('/login', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos
], login);

module.exports = router;