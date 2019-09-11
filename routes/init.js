const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const { SQL_CREATE_TABLE } = require('../sql')

router.get('/init', (req, res) => {
    db.query(SQL_CREATE_TABLE)
        .then(() => {
            res.send("SUCCESS")
        })
})
module.exports = router
