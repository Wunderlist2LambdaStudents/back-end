const router = require('express').Router()

const Auth = require('../model/auth_model')
const ServerException = require('../errors/ServerException')
const InvalidCredentialsException = require('../errors/InvalidCredentialsException')

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({ todo: 'route works' })
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

module.exports = router