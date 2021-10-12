const mongoose= require('mongoose');
const Schema= mongoose.Schema ;


const db_users= new Schema({
    usuario: String,
    password: String
});

//Convertir a modelo

const usuario= mongoose.model('Usuario', db_users);

module.exports= usuario;
