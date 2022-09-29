const jwt = require('jsonwebtoken');

const generarJwt = (uid = '') =>{

    return new Promise((resolve, reject) =>{

        const payload = {uid}; // aqui establezco que info del usuario deseo guardar en el jwt
        jwt.sign(payload, process.env.SECRETOPRIVATEKEY, {//genero mi jwt y le paso mi llave secreta
            expiresIn: '1h' //tiempo de expiración
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            else{
                resolve(token);
            }
        }); 
    });
    

}

module.exports ={
    generarJwt
}