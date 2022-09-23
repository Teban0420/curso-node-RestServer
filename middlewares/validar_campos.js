const {validationResult} = require('express-validator');

// un middleware es una funcion 

const validar_campos = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ){//si hay errores devuelvo el tipo de error
        return res.status(400).json(errors);
    }
    next();

}

module.exports = {
    validar_campos
}