const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.js');
const {generarJwt} = require('../helpers/generarJWT.js');



const logUser = async(req, res = response) =>{

    const {correo, password} = req.body;

    const usuario = await Usuario.findOne({correo});
    if(!usuario){ // verificar si email existe
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
    }

    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
    }

    //validamos la contraseña
    const passValid = bcryptjs.compareSync(password, usuario.password);
    if(!passValid){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
    }

    //validamos JWT
    const token = await generarJwt(usuario.id);

    try {

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

   
}

module.exports ={
    logUser}