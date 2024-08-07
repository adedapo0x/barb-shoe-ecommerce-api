const verifyAdminStatus = (req, res, next) => {
    if (req.user && req.user.role === 'admin') next()
    else return res.status(401).json({message: "Unauthorized access: Only admins allowed!"})
}

module.exports = verifyAdminStatus