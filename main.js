/* import axios from 'axios'

let apiURL= 'http://localhost:3000/api';
axios.get(apiURL).then(() => {
    console.log('conectado existosamente a la api');
}).catch((error)=>{
    console.log('ocurrio un error ÑOOOO')
}) */
fetch('http://localhost:3000/api/login', {
    method: 'GET'
})
.then((response) => {
    console.log('conectado a la api')
})