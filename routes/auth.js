const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v5: uuidv5 } = require('uuid')

const Auth = require('../model/auth_model')
const ServerException = require('../errors/ServerException')
const InvalidCredentialsException = require('../errors/InvalidCredentialsException')

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({ auth: 'route works' })
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const uuidSecret = process.env.UUID_SECRET || '282243a3-7c3c-441a-bbbc-d01a324b9b6b'
        const uuid = uuidv5(username, uuidSecret)
        
        if(username && password) {
            const hash = bcrypt.hashSync(password, rounds)
            const user = { uuid, username, password: hash }
            const token = createToken(user)
            const newUser = { uuid, username, password: hash, token }
            const createUser = await Auth.register(newUser)
            res.status(201).json(createUser)
        } else {
            next(new InvalidCredentialsException('missing data'))
        }
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if(!username || !password) {
            next(new InvalidCredentialsException('missing data'))
        } else {
            const user = await Auth.getUser({ username })
            const hash = bcrypt.compareSync(password, user.password)
            if(hash) {
                const userInfo = await Auth.login({ username })
                res.status(200).json(userInfo)
            } else {
                next(new InvalidCredentialsException('wrong password'))
            }
        }
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

function createToken(user) {
    const jwtSecret = process.env.JWT_SECRET || 'jwtsecret123'
    const payload = {
      sub: user.uuid,
      username: user.username
    }
  
    const options = {
      expiresIn: '30d'
    }
  
    return jwt.sign(payload, jwtSecret, options)
  }

module.exports = router