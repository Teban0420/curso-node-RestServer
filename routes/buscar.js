
const {Router} = require('express');
const {Buscar} = require('../controllers/buscar.js');

const router = Router();

router.get('/:coleccion/:termino', Buscar);


module.exports = router;
