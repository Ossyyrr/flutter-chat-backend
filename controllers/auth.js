
const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');


const crearUsuario = async (req, res = response) => {

    const usuario = new Usuario(req.body)
    await usuario.save();

    res.json({
        ok: true,
        // msg: 'Crear usuario!!!',
        body: req.body,
    });
}


module.exports = {
    crearUsuario
}