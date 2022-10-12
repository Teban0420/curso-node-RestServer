
const {Schema, model} = require('mongoose');


const categoriaSchema = Schema({
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
    }
});

//metodo para extraer lo que no queremos mostrar de la categoria
categoriaSchema.methods.toJSON = function(){
    const {__v, estado,  ...data} = this.toObject();
    return data
}

module.exports = model('Categoria', categoriaSchema);