const express = require('express')
const authRouter = require('../routes/auth')
const todoRouter = require('../routes/todo')

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'working' })
})

server.use('/auth', authRouter)
server.use('/todo', todoRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'working' })
})

server.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
})