const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../utils/db')
const { SALT_ROUNDS }  = require('../config')
const { SQL_LOGIN, SQL_REGISTER, SQL_REGISTER_INSERT } = require('../sql')

router.get('/logout',(req,res) => {
    if(req.session)
    req.session.destroy((error) => {
        if(error) {
            next(error)
        } else {
            res.redirect('/login')
        }
    })
})

router.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    db.oneOrNone(SQL_LOGIN, [username])
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function (error, result) {
                    if (result) {
                        if (req.session) {
                            req.session.user = { userId: user.userid, username: user.username }

                        }

                        res.redirect('/dashboard/checklist')
                    } else {
                        res.render('login', { message: "Invalid username or password" })
                    }
                })
            } else {
                res.render('login', { message: "Invalid username or password" })
            }
        })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.oneOrNone(SQL_REGISTER, [username])
        .then((user) => {
            if (user) {
                res.render('register', { message: "User name already exists!" })
            } else {

                bcrypt.hash(password, SALT_ROUNDS, function (error, hash) {

                    if (error == null) {
                        db.none(SQL_REGISTER_INSERT, [username, hash])
                            .then(() => {
                                res.redirect('/login')
                            })
                    }
                })
            }

        })
})

router.get('/register', (req, res) => {
    res.render('register')
})
module.exports = router
