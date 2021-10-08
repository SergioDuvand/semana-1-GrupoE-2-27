const mongoose= require('mongoose');
const Schema= mongoose.Schema ;


const usuarioSchema= new Schema({
    usuario: String,
    password: String
});

//Convertir a modelo

const usuario= mongoose.model('Usuario', usuarioSchema);

module.exports= usuario;
