const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//procedimiento paa registrarnos
exports.register = async (req,res)=>{
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        //console.log(name + " - " + user + " - " + " - " + pass)
        let passHash = await bcryptjs.hash(pass,8)
        //console.log(passHash)
        conexion.query('INSERT INTO users Set ?',{user:user,name:name,pass:passHash},(error,results)=>{
            if(error){console.log(error)}
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req,res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass
        console.log(user + ' - ' + pass)
        if (!user || !pass) {
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingresar un usuario y/o conraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE user =?', [user], async (error,results)=>{
                if (results.length == 0 || !(await bcryptjs.compare(pass,results[0].pass))) {
                    res.render('login',{
                        alert:true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingresar un usuario y/o conraseña",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                } else {
                    //iniciode sesion ok
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generar token si expiracion
                    //const token = jwt.sign(id:id),process.env.JWT_SECRETO)
                    console.log("token: "+token+" para el usuario: "+user)
                }
                const cookiesOption = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt',token,cookiesOption)
                res.render('login',{
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMessage: "¡Login Correcto!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: ''
                })


            })
        }
    } catch (error) {
        console.log(error)
    }
}