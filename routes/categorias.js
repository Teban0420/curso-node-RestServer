
const {Router} = require('express');
const {check} = require('express-validator');
const {validar_campos} = require('../middlewares/validar_campos.js');
const {validarJWT} = require('../middlewares/validar_jwt.js');
const {Admin_rol} = require('../middlewares/validar-roles.js');
const {existeCategoria} = require('../helpers/DB_validators.js');
const {crearCategoria, 
       obtenerCategorias,
       obtenerCategorias_id,
       actualizarCategoria, 
       borrarCategoria} = require('../controllers/categorias.js');


const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//obtener categoria por id - publico
router.get('/:id',
 check('id', 'No es un Id de Mongo valido').isMongoId(),
 validar_campos,
 check('id').custom(existeCategoria),
 obtenerCategorias_id);

 //crear categoria privado - cualquier usuario con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    crearCategoria
],validar_campos);

// actualizar categoria privado - cualquier usuario con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validar_campos
],actualizarCategoria);

router.delete('/:id',[
    validarJWT,
    Admin_rol,
    check('id', 'No es un Id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validar_campos
], borrarCategoria);

module.exports = router;