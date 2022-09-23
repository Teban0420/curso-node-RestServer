
const {Schema, model} = require('mongoose');

const RolSchema = Schema({
    rol:{
        type: String,
        required: [true, 'Este campo es obligatorio']
    }
});

module.exports = model('rol', RolSchema);