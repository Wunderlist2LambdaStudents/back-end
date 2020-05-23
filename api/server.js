const express = require('express')

const authRouter = require('../routes/auth')

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())
server.use('/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'working' })
})

server.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
})