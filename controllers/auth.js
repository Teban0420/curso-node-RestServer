const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.js');
const {generarJwt} = require('../helpers/generarJWT.js');
const {Googleverify} = require('../helpers/google-verify.js');



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

    //generamos JWT
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

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;

    try {

        const {nombre, correo, img} =  await Googleverify(id_token);
        
        let usuario = await Usuario.findOne({correo}); //verifico el correo del usuario en DB

        //si no existe
        if(!usuario){ // lo guardamos en DB

            const data = {
                nombre,
                google: true,
                correo,
                password: '123456',
                rol: 'user',                
                img,
                
            };

            usuario = new Usuario( data ); //creo un nuevo usuario
            await usuario.save(); // lo guardo en db
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'El usuario se encuentra bloqueado'
            });
        }

        //generamos JWT
        const token = await generarJwt(usuario.id);        

        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        console.log(error);

         res.status(400).json({
            msg: 'El token no se pudo verificar'
        });
        
    }

   
}

module.exports ={
    logUser,
    googleSignIn}