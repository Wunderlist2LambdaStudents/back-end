const db = require('../data/dbConnection')

function getTodosByUuid(uuid) {
    return db('todo').select('*').where({ user_uuid: uuid })
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
    const getNewTodo = await getTodosByUuid(todo.user_uuid)
    const lastTodo = getNewTodo.length <= 1 ? 1 : getNewTodo.length - 1
    const locationInsert = await db('location').insert({ location_id: getNewTodo[lastTodo].location || null, latitude: todo.location.x || null, longitude: todo.location.y || null})
    return getNewTodo[lastTodo]
}

module.exports = {
    getTodosByUuid,
    addTodo
}