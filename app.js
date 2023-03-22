const express = require('express')
const dotenv = require('dotenv')
const cokiesParser = require ('cookie-parser')

const app = express()

//Setear el motor de plantilla
app.set('view engine', 'ejs')

//Setear la carpeta public
app.use(express.static('public'))

//Configurar node para procesar datos de formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//setear variables de entorno
dotenv.config({path: './env/.env'})

//setear las cokies
//app.use(cokiesParser) comentada hasta empezar a trabajar con las cokies de sesion jwt

//llamar al enrutador
app.use('/',require('./routes/router.js'))


app.listen(3000,()=> {
    console.log('El servidor esta corriendo en http://localhost:3000')
})