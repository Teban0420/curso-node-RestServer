
const {Router} = require('express');
const {check} = require('express-validator');
const {validar_campos} = require('../middlewares/validar_campos.js');
const {logUser, googleSignIn} = require('../controllers/auth.js');

const router = Router();

//router.post('/login', login );
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos
], logUser);

router.post('/google',[
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validar_campos
], googleSignIn);

module.exports = router;