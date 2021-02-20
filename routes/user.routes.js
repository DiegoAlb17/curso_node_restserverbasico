const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
} = require('../controllers/user.controller');

const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = Router();

router.get('/', getUsuarios);

//router.get('/:id', getUsuarios);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('role').custom(esRoleValido),
    validarCampos
], putUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
], postUsuarios);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
], deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;