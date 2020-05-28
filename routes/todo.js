const router = require('express').Router()

const Todo = require('../model/todo_model')
const ServerException = require('../errors/ServerException')
const InvalidCredentialsException = require('../errors/InvalidCredentialsException')

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({ todo: 'route and authentication works' })
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.get('/fetch/:id', async (req, res, next) => {
    try {
        const uuid = req.params.id
        const todos = await Todo.getTodosByUuid(uuid)
        res.status(200).json(todos)
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const { uuid, title, body, due_date, recurring, location = { x: null, y: null } } = req.body
        if(uuid && title && body && due_date && recurring ) {
            const todo = { user_uuid: uuid, title, body, due_date, recurring, location }
            const addTodo = await Todo.addTodo(todo)
            res.status(201).json(addTodo)
        } else {
            next(new InvalidCredentialsException('missing data'))
        }
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.post('/edit/:loc_id', async (req, res, next) => {
    try {
        const id = req.params.loc_id
        const { body, title, due_date, recurring, completed } = req.body
        const todo = { body, title, due_date, completed, recurring }
        const editTodo = await Todo.editTodo(id, todo)
        res.status(200).json(editTodo)
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.delete('/remove/:loc_id', async (req, res, next) => {
    try {
        const id = req.params.loc_id
        const deleteTodo = await Todo.deleteTodo(id)
        res.status(200).json(deleteTodo)
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

module.exports = router