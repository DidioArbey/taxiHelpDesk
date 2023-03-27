const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
// const conexion = require('../database/db')
//rutas para las vistas
// ruta para el home
router.get('/', (req, res)=>{
    // conexion()
    res.render('index')
})

// ruta para el login
router.get('/login', (req, res)=>{
    res.render('login',{alert:false})
})
// ruta para el register
router.get('/register', (req, res)=>{
    res.render('register')
})

//rutas para el controller
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router