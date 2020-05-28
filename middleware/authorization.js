const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        const jwtSecret = process.env.JWT_SECRET || 'jwtsecret123'

        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ error: 'bad token' })
            } else {
                req.jwt = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({ error: 'please provide authentication information' })
    }
}