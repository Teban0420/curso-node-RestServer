

const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({ // el esquema es la estructura de la tabla

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contraseña es obligatoria']        
    },
    img:{
        type: String,      
    },
    rol:{
        type: String,  
        required: true,
        emun: ['admin', 'user']    
    },
    estado:{
        type: Boolean, 
        default: true     
    },
    google:{
        type: Boolean,
        default: false      
    },
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);

