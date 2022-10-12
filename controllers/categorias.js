
const {response} = require('express');
const Categoria = require('../models/categoria.js');

const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const [total, Categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true}),
        Categoria.find( {estado: true} ) //condicion de filtrar solo estados en true
        .populate('usuario', 'nombre')
        .skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({
      total,
      Categorias
    });
}

const obtenerCategorias_id = async(req, res = response) => {
    const id = req.params.id;

    const categoria_id = await Categoria.findById(id).populate('usuario', 'nombre');
    
    res.json(categoria_id);
}

const crearCategoria = async(req, res = response) => {
    

    try {

        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre});//verifico si ya existe el nombre de esa categoria

        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            });
        }

        //generar la data
        const data = {
            nombre,
            usuario: req.usuario._id// el id del usuario viene en la request
        }        
       

         //preparamos la data y creamos una nueva instancia del modelo
         const categoria = new Categoria( data );        
         // grabamos en db
          await categoria.save();       

         res.status(201).json({categoria});
        
    } catch (error) {
        console.log(error);        
    }

}

const actualizarCategoria = async(req, res = response) => {

    const id = req.params.id;
    const {estado, usuario, ...data} = req.body; // parametros que no permito actualizar

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.json(categoria);
}

const borrarCategoria = async(req, res = response) => {

    const id = req.params.id;
    const borrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(borrada);

}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategorias_id,
    actualizarCategoria,
    borrarCategoria
}