const admin = ['admin', 'super']
const { User } = require('../models')
const roles = require('../helpers/roles')
const logged = req => req.session.user
const upgrade = async req => {
    req.session.user = await User.findOne({_id: req.session.user._id}).lean()
    if (req.session.user) await User.updateOne({_id: req.session.user._id}, {$set: { lastSession: new Date() }})
}

module.exports = {
    async onlyUsers(req, res, next) {
        if (!logged(req)) return res.status(401).json({error: 'Unauthorized'})
        await upgrade(req)
        next()
    },
    async onlyAdmin(req, res, next) {
        if (!logged(req)) return res.status(401).json({error: 'Unauthorized'})
        if (!roles.isAdmin(req.session.user.role)) return res.status(403).json({error: 'Forbidden'})
        await upgrade(req)
        next()
    }
}