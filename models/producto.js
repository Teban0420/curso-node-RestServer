

const {Schema, model} = require('mongoose');


const productoSchema = Schema({
    nombre:{ // estos son los campos de la db
        type: String,
        required: [true, 'Este campo es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    //hago referencia a otra coleccion de mongo, q tipo de usuario creo la categoria
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        //required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean
    }
});

//metodo para extraer lo que no queremos mostrar de la categoria
productoSchema.methods.toJSON = function(){
    const {__v, estado,  ...data} = this.toObject();
    return data
}

module.exports = model('Producto', productoSchema);