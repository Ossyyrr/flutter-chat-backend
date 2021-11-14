
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer token de los headers de la petición
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        //Verifica el token con respecto al JWT_KEY, trato de extraer el uid del token, si no lo extrae es porque no tengo un token válido.
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //Agrego a la request el uid extraido para poder mandarlo luego en la response
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        })
    }


}

module.exports = {
    validarJWT
}