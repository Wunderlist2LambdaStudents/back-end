const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ auth: 'route works' })
})

module.exports = router