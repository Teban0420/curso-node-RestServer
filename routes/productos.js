
const {Router} = require('express');
const {check} = require('express-validator');
const {validar_campos} = require('../middlewares/validar_campos.js');
const {validarJWT} = require('../middlewares/validar_jwt.js');
const {Admin_rol} = require('../middlewares/validar-roles.js');
const {existeCategoria, existeProducto} = require('../helpers/DB_validators.js');

const { crearProducto,
        obtenerProductos,
        obtenerProductos_id,
        actualizarproducto,
        borrarproducto} = require('../controllers/productos.js');


const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerProductos);

//obtener categoria por id - publico
router.get('/:id',
 check('id', 'No es un Id de Mongo valido').isMongoId(),
 validar_campos,
 check('id').custom(existeProducto),
 obtenerProductos_id);

 //crear categoria privado - cualquier usuario con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    crearProducto
],validar_campos);

// actualizar categoria privado - cualquier usuario con token valido
router.put('/:id',[
    validarJWT,
    //check('categoria', 'No es un Id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validar_campos
],actualizarproducto);

router.delete('/:id',[
    validarJWT,
    //Admin_rol,
    check('id', 'No es un Id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validar_campos
], borrarproducto);

module.exports = router;