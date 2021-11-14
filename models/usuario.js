const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    }
});

// Para que la response no devuelva __v, password
UsuarioSchema.method('toJSON', function () {

    //...object -> Coge el resto de propiedades del objeto no definidas antes y las almacena en una variable llamada object
    const { __v, _id, password, ...object } = this.toObject();
    // Renombro el _id a uid
    object.uid = _id;
    return object;

})

module.exports = model('Usuario', UsuarioSchema);