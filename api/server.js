const express = require('express')
const authRouter = require('../routes/auth')
const todoRouter = require('../routes/todo')
const errorHandler = require('../errors/errorHandler')
const authentication = require('../middleware/authorization')

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'working' })
})

server.use('/auth', authRouter)
server.use('/todo', authentication, todoRouter)

server.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Server Running on ${PORT}`));
}

module.exports = server