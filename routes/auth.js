// path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



router.post('/new', [
    // MIDDELWARES
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check("password", "8 caracteres, una mayúscula y un número").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    validarCampos,
], crearUsuario);




module.exports = router;