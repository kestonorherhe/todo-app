const express = require('express')
const router = express.Router()
const todo = require('../models/todo')

// insert todo record
router.post('/todo', (req, res) => {
    console.log(req.body)
    todo.create(req.body.todo, (err, todo) => {
        if (err)
        res.send(err)
        res.json({
            message: 'new todo item inserted',
            _todoId: todo._id
        })
    })
})

// get all todos
// chaining multiple request handlers in one route
router.get('/todos', (req, res, next) => {
    todo.find((err, todos) => {
        if (err)
        res.send(err)
        const metadata = { total_count: todos.length }
        res.json({ _metadata: metadata, todos: todos })
    })
})

// get all completed todos
router.get('/todos/filter', (req, res) => {
    let query = req.query
    console.log(query)
    todo.find(query).exec((err, todos) => {
        if (err)
        res.send (err)
        res.json ({
            todos: todos
        })
    })
})

// update user record
router.put('/todo-id/:id', (req, res) => {
    console.log(req.body.todo);
    todo.findById(req.params.id, (err, todo) => {
        if (err)
        res.send(err)
        // if no errors, append updates
        req.body.todo.title ? (todo.title = req.body.todo.title) : null
        req.body.todo.tag ? (todo.tag = req.body.todo.tag) : null
        req.body.priority ? (todo.priority = req.body.priority) : null
        req.body.todo.status ? (todo.status = req.body.todo.status) : null
        req.body.todo.checked ? (todo.checked = req.body.todo.checked) : null
        req.body.todo.desc ? (todo.desc = req.body.todo.desc) : null
        //  save update
        todo.save(err => {
            if (err) 
            res.send(err)
            res.json({
                message: 'todo item updated'
            })
        })
    })
})
// delete user record
router.delete('/todo-id/:id', (req, res) => {
    console.log(req.params);
    todo.findByIdAndRemove(req.params.id, (err) => {
        if (err)
        res.send(err)
        res.json({
            message: 'todo item deleted'
        })
    })
})

module.exports = router