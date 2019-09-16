const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const { SQL_DELETE_TASK, SQL_INSERT_TASK, SQL_SHOW_LIST, SQL_COUNT_TASKS, SQL_UPDATE } = require('../sql')

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

    db.none(SQL_UPDATE, [isChecked, id])
        .then(() => {
            res.json({ success: true })
        })
})

router.get('/checked-tasks', (req, res) => {
    const userId = req.session.user.userId
    const page = req.query.page || 1
    const pageURL = "/dashboard/checked-tasks"

    db.query(SQL_COUNT_TASKS, [true])
        .then((result) => {
            const show = (page - 1) * 6
            db.any(SQL_SHOW_LIST, [userId, true, show])
                .then((check_list) => {
                    const count = result[0].count
                    nr_page = Math.trunc(count / 6 + 1)
                    const pages = []
                    for (var i = 1; i <= nr_page; i++) {
                        pages.push(i)
                    }
                    const prev_page = `${pageURL}?page=${page === 1 ? 1 : page - 1}`
                    const next_page = `${pageURL}?page=${page === nr_page ? nr_page : page + 1}`
                    res.render('check_list', { check_list: check_list, pages, next_page, prev_page, pageURL })
                })
        })
})

router.get('/checklist', (req, res) => {
    const userId = req.session.user.userId
    const page = +req.query.page || 1
    const pageURL = "/dashboard/checklist"

    db.query(SQL_COUNT_TASKS, [false])
        .then((result) => {
            const show = (page - 1) * 6
            db.any(SQL_SHOW_LIST, [userId, false, show])
                .then((check_list) => {
                    const count = result[0].count
                    const nr_page = Math.trunc(count / 6 + 1)
                    const pages = []
                    for (var i = 1; i <= nr_page; i++) {
                        pages.push(i)
                    }
                    const prev_page = `${pageURL}?page=${page === 1 ? 1 : page - 1}`
                    const next_page = `${pageURL}?page=${page === nr_page ? nr_page : page + 1}`
                    res.render('check_list', { check_list: check_list, pages, prev_page, next_page, pageURL })
                })
        })
})
module.exports = router
