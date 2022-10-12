
const {response} = require('express');
const {ObjectId} = require('mongoose').Types;
const Usuario = require('../models/usuario.js');
const Categoria = require('../models/categoria.js');
const Producto = require('../models/producto.js');

const coleccionPermitidas = [
    'categoria',
    'producto',
    'usuario'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino); // regresa un true o false
    if(isMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    //expresion regular insensible a mayusculas y minusculas
    const regex = new RegExp( termino, 'i');

    //en el find tenemos otras condiciones de busqueda como el or
    const usuarios = await Usuario.find({
        //con el signo de dolar y se especifican las condiciones a cumplir
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}] //si o si debe cumplir esta condicion
    });
    res.json({
        results: usuarios
    });
}

const buscarCategorias = async(termino = '' , res = response) =>{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria
        });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        nombre: regex,
        estado: true
    });
    res.json({
        results: categorias
    });
}

const buscarProductos = async(termino = '', res = response) =>{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: producto
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre');
    res.json({
        results: productos
    });
}

const Buscar = (req, res = response) =>{

    const {coleccion, termino} = req.params;

    if(!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas para filtrar la busqueda son: ${coleccionPermitidas}`
        });
    }

    switch (coleccion) {
        case 'categoria':
            buscarCategorias(termino, res);         
            
            break;

        case 'producto':
            buscarProductos(termino, res);
            
            break;

        case 'usuario':
            buscarUsuarios(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
            
    }

}


module.exports ={
    Buscar
}