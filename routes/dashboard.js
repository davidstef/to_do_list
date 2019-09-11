const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const { SQL_DELETE_TASK, SQL_INSERT_TASK, SQL_SHOW_LIST } = require('../sql')

// router.post('/delete-task', (req, res) => {
//     const listid = req.body.listid

//     db.none(SQL_DELETE_TASK, [listid])
//         .then(() => {
//             res.redirect('/dashboard/checklist')
//         })
// })

router.delete('/delete-task/:id', (req, res) => {
    const id = req.params.id

    db.none(SQL_DELETE_TASK, [id])
        .then(() => {
            res.json({ success: true })
        })
})

router.get('/add-task', (req, res) => {
    res.render('add-task')
})

router.post('/add-task', (req, res) => {
    const task = req.body.task;
    const userId = +req.session.user.userId;

    db.none(SQL_INSERT_TASK, [task, userId])
        .then(() => {
            res.redirect('/dashboard/checklist')
        })
})

router.patch('/checked-tasks/:id', (req, res) => {
    const isChecked = req.body.checked
    const id = req.params.id

    db.none('UPDATE check_list SET is_checked=$1 WHERE listid=$2', [isChecked, id])
        .then(() => {
            res.json({ success: true })
        })
})

// router.post('/checked-tasks', (req, res) => {
//     const userId = req.session.user.userId

//     db.any(SQL_SHOW_CHECKED_LIST, [userId])
//         .then((check_list) => {
//             res.render('checked_tasks', { check_list: check_list })
//         })
// })

router.get('/checked-tasks', (req, res) => {
    const userId = req.session.user.userId

    db.any(SQL_SHOW_LIST, [userId, true])
        .then((check_list) => {
            res.render('check_list', { check_list: check_list })
        })
})

router.get('/checklist', (req, res) => {
    const userId = req.session.user.userId

    db.any(SQL_SHOW_LIST, [userId, false])
        .then((check_list) => {
            res.render('check_list', { check_list: check_list })
        })
})
module.exports = router
