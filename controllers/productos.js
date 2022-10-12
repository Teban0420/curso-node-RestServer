

const {response} = require('express');
const Producto = require('../models/producto.js');

const obtenerProductos = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;

    const [total, Productos] = await Promise.all([
        Producto.countDocuments({ estado: true}),
        Producto.find( {estado: true} ) //condicion de filtrar solo estados en true
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({
      total,
      Productos
    });
}

const obtenerProductos_id = async(req, res = response) => {
    const id = req.params.id;

    const producto_id = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
    
    res.json(producto_id);
}

const crearProducto = async(req, res = response) => {
    

    try {

        const {estado, usuario, ...body} = req.body;
        const ProductoDB = await Producto.findOne({nombre: body.nombre});//verifico si ya existe el nombre de esa producto

        if(ProductoDB){
            return res.status(400).json({
                msg: `El producto ${ProductoDB.nombre} ya existe`
            });
        }

        //generar la data
        const data = {
            ...body, //mando todo lo demas
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id// el id del usuario viene en la request
        } 
        console.log(data);       
       

         //preparamos la data y creamos una nueva instancia del modelo
         const producto = new Producto( data );        
         // grabamos en db
          await producto.save();       

         res.status(201).json({producto});
        
    } catch (error) {
        console.log(error);        
    }

}

const actualizarproducto = async(req, res = response) => {

    const id = req.params.id;
    const {estado, usuario, ...data} = req.body; // parametros que no permito actualizar

    if(data.nombre){ // si viene la capitalizo en caso contrario no
        data.nombre = data.nombre.toUpperCase();
    }
   
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json(producto);
}

const borrarproducto = async(req, res = response) => {

    const id = req.params.id;
    const borrada = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(borrada);

}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductos_id,
    actualizarproducto,
    borrarproducto
}