
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
        }

        const usuario = new Usuario(req.body)

        // Encriptar contraseña:
        // salt -> genera un número de forma aleatoria.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        return res.json({
            ok: true,
            // msg: 'Crear usuario!!!',
            usuario,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDb = await Usuario.findOne({ email });
        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado',
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida',
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDb.id);

        return res.json({
            ok: true,
            usuario: usuarioDb,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    console.log('uid');
    console.log(uid);

    // Generar el JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por el UID


    try {

        const usuarioDb = await Usuario.findById({ _id: uid });


        return res.json({
            ok: true,
            usuario: usuarioDb,
            token,
        });



    } catch (error) {
        console.log(error);
        return res.status(402).json({
            ok: false,
            msg: 'No se ha podido obtener el usuario por uid',
        });
    }




}

module.exports = {
    crearUsuario, login, renewToken,
}