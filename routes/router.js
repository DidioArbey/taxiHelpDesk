const express = require('express')
const router = express.Router()


const conexion = require('../database/db')

// ruta para el home
router.get('/', (req, res)=>{
    conexion()
    res.render('index')
})

// ruta para el login
router.get('/login', (req, res)=>{
    res.render('login')
})
// ruta para el register
router.get('/register', (req, res)=>{
    res.render('register')
})

module.exports = router