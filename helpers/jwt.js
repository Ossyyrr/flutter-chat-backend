const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {


    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // TOKEN!   
                resolve(token);
            }
        });
    })


};

const comprobarJWT = (token = '') => {
    try {
        //Verifica el token con respecto al JWT_KEY, trato de extraer el uid del token, si no lo extrae es porque no tengo un token válido.
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //Agrego a la request el uid extraido para poder mandarlo luego en la response

        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT, comprobarJWT
}