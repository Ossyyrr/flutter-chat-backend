const { Schema, model } = require('mongoose');


const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true,
    }
},
    {
        // propio de mongo, aplica el date actual
        timestamps: true
    }
);

// Para que la response no devuelva __v, password
MensajeSchema.method('toJSON', function () {

    //...object -> Coge el resto de propiedades del objeto no definidas antes y las almacena en una variable llamada object
    const { __v, _id, ...object } = this.toObject();
    return object;

})

module.exports = model('Mensaje', MensajeSchema);