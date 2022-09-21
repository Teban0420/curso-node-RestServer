
// rutas relacionadas a los usuarios
const {Router} = require('express');
const router = Router();

const {usuariosGet,
       usuariosPost, 
       usuariosPut, 
       usuariosDelete} = require('../controllers/user.controller.js');

router.get('/', usuariosGet);

  router.put('/:id',usuariosPut); // establezco que parametros recibo

  router.post('/', usuariosPost);

  router.delete('/', usuariosDelete);


module.exports = router;