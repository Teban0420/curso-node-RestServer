
const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js');

const validarJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //funcion que valida que el token sea valido
       const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
       const usuario = await Usuario.findById(uid);

       if(!usuario){
           return res.status(401).json({
               msg: 'Token no valido - usuario borrado en DB'
           });
       }

       //verificar que el uid tiene estado en true
        if( !usuario.estado){
           return res.status(401).json({
               msg: 'Token no valido - usuario con estado false'
           });
       }
       req.usuario = usuario; //obtengo el uid para procesarlo 
       

        next(); // funcion que continua ejecutando el proximo middleware o el controlador
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }

}

module.exports = {
    validarJWT
}