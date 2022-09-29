const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');


const usuariosGet = async(req, res = response) =>{

    //const {} = req.query;
    const {limite = 5, desde = 0} = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find( {estado: true} ) //condicion de filtrar solo estados en true
        .skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({
      total,
      usuarios
    });
}

const usuariosPost = async (req, res = response) =>{

    
    const {nombre, correo, password, rol}= req.body; // recibo en esta variable los datos q me envian en la req
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo ya existe
   
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //se establece el numero de saltos
    usuario.password = bcryptjs.hashSync(password, salt);

    //grabo el registro en db
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) =>{
    const id = req.params.id;
    //extraigo todo lo que no es permitido al usuario actualizar
    const {_id, password, google, correo, ...resto} = req.body; 

    //validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(); //se establece el numero de saltos
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({usuario});
}

const usuariosDelete = async (req, res = response) =>{
    const {id} = req.params;
    const uid = req.uid;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuario_auth = req.usuario;
    res.json({
       usuario
    });
}


    module.exports ={
        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
    }