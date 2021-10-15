const mongoose= require('mongoose');
const Schema= mongoose.Schema ;


const db_recetas= new Schema({
    
    receta: String,
    ingredientes: String,
    preparacion: String,
    autor: String,
    date:{type:Date, default:Date.now}
});

const recetas= mongoose.model('Recetas', db_recetas);

module.exports= recetas;