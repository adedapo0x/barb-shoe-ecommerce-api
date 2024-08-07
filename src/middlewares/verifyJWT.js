const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Unauthorized access"})
    }

    const token = authHeader.split(' ')[1]

    try{
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (err) {
        return res.status(401).json({message: "Unauthorized access."})
    }
}

module.exports = verifyJWT


