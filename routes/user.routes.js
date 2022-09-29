
// rutas relacionadas a los usuarios
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { validarJWT} = require('../middlewares/validar_jwt.js');
const {Admin_rol, rol} = require('../middlewares/validar-roles.js');
const {validar_campos} = require('../middlewares/validar_campos.js');
const {Validar_rol, Validar_email, Validar_id} = require('../helpers/DB_validators.js');



const {usuariosGet,
       usuariosPost, 
       usuariosPut, 
       usuariosDelete} = require('../controllers/user.controller.js');

router.get('/', usuariosGet);

  router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(Validar_id),
    check('rol').custom( Validar_rol),
    validar_campos
  ],usuariosPut); // establezco que parametros recibo

  router.post('/',[ //antes de invocar la funcion se hacen todas las validaciones
    check('nombre', 'Este campo es obligatorio ').not().isEmpty(), 
    check('correo').custom( Validar_email), 
    check('password', 'La contraseña debe ser de minimo 6 caracteres ').isLength({min:6}),
    //check('rol', 'No es un rol valido ').isIn(['admin', 'user']), 
    check('rol').custom( Validar_rol),
    validar_campos
  ], usuariosPost);

  router.delete('/:id',[
    validarJWT,
    // Admin_rol,
    rol('admin', 'ventas'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(Validar_id),
    validar_campos
  ], usuariosDelete);


module.exports = router;