
const express = require('express');
const Cors = require('cors');
const {DBconnection} = require('../db/config.js');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        
        //conectar a la database
        this.conectarDB();

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

    async conectarDB(){
        await DBconnection();
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes.js'));
        this.app.use(this.paths.buscar, require('../routes/buscar.js'));     
        this.app.use(this.paths.categorias, require('../routes/categorias.js'));
        this.app.use(this.paths.productos, require('../routes/productos.js'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes.js'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;