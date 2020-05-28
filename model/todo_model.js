const db = require('../data/dbConnection')

function getTodosByUuid(uuid) {
    return db('todo').select('*').where({ user_uuid: uuid })
}

function getTodoById(user_uuid, location) {
    return db('todo').select('*').where({ user_uuid, location })
}

async function addTodo(todo) {
    const newTodo = await db('todo').insert({
        user_uuid: todo.user_uuid,
        title: todo.title,
        body: todo.body,
        due_date: todo.due_date,
        completed: false,
        recurring: todo.recurring
    })
    const locationInsert = await db('location').insert({ location_id: newTodo[0] || null, latitude: todo.location.x || null, longitude: todo.location.y || null})
    const getNewTodo = await getTodosByUuid(todo.user_uuid)
    return { todo, location_id: newTodo[0] }
}

async function editTodo(id, todo) {
    const editTodo = await db('todo').where({ location: id }).update(todo)
    return db('todo').select('*').where({ location: id }).first()
}

module.exports = {
    getTodosByUuid,
    getTodoById,
    addTodo,
    editTodo
}

// {
// 	"user_uuid": "83793d0d-19e2-5e0f-a9c7-f9b8b49e5731",
// 	"location": 27
// }