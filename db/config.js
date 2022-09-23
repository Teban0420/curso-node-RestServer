
// conexion a db
const mongoose = require('mongoose');

const DBconnection = async () =>{

    try {

        await mongoose.connect(process.env.MONGOBD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Conexión exitosa a la base de datos en la nube');
        
    } catch (error) {
        throw error('Error con la conexión a la base de datos');
        
    }

}

module.exports = {
    DBconnection
}