
const Rol = require('../models/rol.js');
const Usuario = require('../models/usuario.js');

const Validar_rol = async (rol = '') =>{
    const Rolexiste = await Rol.findOne({rol});
    if(!Rolexiste){
      throw new Error(`El rol ${rol} no existe`);
    }
  };

const Validar_email = async ( correo = '') =>{
    const correo_existe = await Usuario.findOne({correo});
    if(correo_existe){
        throw new Error(`EL correo: ${correo} ya esta registrado`);
        }
    }

const Validar_id = async ( id ) =>{
    const id_existe = await Usuario.findById(id);
    if(!id_existe){
        throw new Error(`El id: ${id} no existe`);
        }
    }


module.exports = {
    Validar_rol,
    Validar_email,
    Validar_id}