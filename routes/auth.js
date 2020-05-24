const router = require('express').Router()

const ServerException = require('../errors/ServerException')

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({ auth: 'route works' })
    } catch(err) {
        console.error(err)
        next(new ServerException())
    }
})

module.exports = router