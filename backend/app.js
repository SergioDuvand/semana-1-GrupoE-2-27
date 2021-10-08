const express = require('express');
const app= express();
const path = require('path');


//Conexion a base de datos
const mongoose = require('mongoose');
const uri= 'mongodb://localhost/db_colombianfood'
const options = {useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, options).then(
    db => console.log('Base de datos lista y conectada')
).catch (error => console.log(error))




//Middelware
app.use(express.json());

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.get('/ruta', function(req,res){
    res.send('Hoolaa mundoo');
});


//PUERTO --generado automaticamente--
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
    console.log('El servidor escucha por el puerto ' + app.get('puerto'));
});