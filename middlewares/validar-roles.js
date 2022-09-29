
const {response} = require('express');

//middleware para validar el rol de administrador
const Admin_rol = (req, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'No se puede validar el rol sin un token valido'
        });
    }

    const {rol, nombre} = req.usuario;

    if(!rol != 'admin'){
        return res.status(401).json({
            msg: `${nombre} no tiene permisos de administrador no puede ejecutar esa función`
        });
    }

    next();
}

const rol = (...roles) =>{//recibo los argumentos

    return (req, res = response, next) =>{ //aqui retorno la funcion que se ejecutara en el controlador
      
        if(!req.usuario){
            return res.status(500).json({
                msg: 'No se puede validar el rol sin un token valido'
            });
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Este servicio requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    Admin_rol,
    rol
}