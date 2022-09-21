
const express = require('express');
const Cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //middlewares
        this.middlewares();

        this.routes(); // invoco el metodo con mis rutas
    }

    middlewares(){
        //CORS
        this.app.use(Cors());

        // lectura y parseo del body
        this.app.use( express.json());
        
        // directorio publico
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;