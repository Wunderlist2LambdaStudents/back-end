const db = require('../data/dbConnection')

async function register(user) {
    await db('user').insert(user)
    return login({ username: user.username })
}

function login(filter) {
    return db('user').select('uuid', 'username', 'token').where(filter).first()
}

function getUser(filter) {
    return db('user').select('*').where(filter).first()
}

function getUserToken(uuid) {
    return db('user').select('token').where({ uuid }).first()
}

module.exports = {
    register,
    login,
    getUser,
    getUserToken
}