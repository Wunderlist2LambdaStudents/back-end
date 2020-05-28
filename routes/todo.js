const router = require('express').Router()

const Todo = require('../model/todo_model')
const ServerException = require('../errors/ServerException')
const InvalidCredentialsException = require('../errors/InvalidCredentialsException')
const authorization = require('../middleware/authorization')

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({ todo: 'route works' })
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.post('/add', authorization, async (req, res, next) => {
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

router.get('/:uuid', authorization, async (req, res, next) => {
    try {
        const uuid = req.params.uuid
        const todos = await Todo.getTodosByUuid(uuid)
        res.status(200).json(todos)
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

module.exports = router