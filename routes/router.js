const express = require('express')
const router = express.Router()

// ruta para el home
router.get('/', (req, res)=>{
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