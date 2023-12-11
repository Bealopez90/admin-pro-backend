/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );

router.post(
    '/',
    [
        check('nombre', 'Name required.').not().isEmpty(),
        check('password', 'Password required.').not().isEmpty(),
        check('email', 'Mail required, needs to have the following structure: username@server.domain').isEmail(),
        validarCampos
    ],
    crearUsuario
);


router.put( '/:id',
    [
        check('nombre', 'Name required.').not().isEmpty(),
        check('email', 'Mail required, needs to have the following structure: username@server.domain').isEmail(),
        check('role', 'Role required.').not().isEmpty(),
        validarCampos
    ],
    updateUsuario
);

router.delete('/:id',
    deleteUsuario

);

module.exports = router;