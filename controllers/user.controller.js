const {response} = require('express');

const usuariosGet = (req, res = response) =>{

    const {} = req.query;
    res.json({
        msg: 'Get API - Controlador'
    });
}

const usuariosPost = (req, res = response) =>{
    const {nombre, edad} = req.body; // recibo en esta variable los datos q me envian en la req
    res.json({
        msg: 'Post Api - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) =>{
    const id = req.params.id;

    res.json({
        msg: 'Put Api - Controlador',
        id
    });
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'Delete Api - Controlador'
    });
}


    module.exports ={
        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
    }