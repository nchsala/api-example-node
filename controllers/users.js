const { NotFoundError, ExpectedTypeError } = require('../helpers/errors')
const { User } = require('../models')
const qs = require('querystring')

module.exports = {
    async postFirstAdmin(req, res, nxt) {
        let existAdmin = await User.exists({role: "ADMIN"})
        if (!existAdmin) {
            await User.create(req.body)
            return res.status(201).json({ok: true})
        } else {
            return res.status(200).json({ok: true})
        }
    },
    async postOne(req, res, nxt){
        let user = await User.create(req.body)
        res.status(201).json(user)
    },

    async putOne(req, res, nxt){
        let user = await User.findById(req.params.id).exec()
        if (!user) return nxt( new NotFoundError('user') )
        Object.assign(user, req.body)
        await user.save()
        res.json(user)
    },

    async deleteOne(req, res) {
        await User.findOneAndDelete({_id: req.params.id})
        res.json({msg:"Deleted"})
    },

    async getOne(req, res, nxt){
        let user = await User.findOne({_id:req.params.id},'-password -__v').exec()
        if (!user) return nxt( new NotFoundError('user') )
        res.json(user)
    },

    async login(req, res, nxt){
        let user = await User.findOne({email:req.body.email}).exec()
        if(!user.checkPassword(req.body.password)) return nxt( new NotFoundError('user') )
        req.session.user = user
        res.json(user)
    },

    async logout(req, res, nxt){
        delete req.session.user
        res.json({msg:"Close Session"})
    },

    async isLogged(req, res, nxt){
        res.json({
            isLogged : !!req.session.user
        })
    },


    async search( req, res, nxt ) {
        let q = req.query.q

        let opts = {}

        let limit = req.query.limit ? parseInt(req.query.limit) : undefined
        let skip  = req.query.skip  ? parseInt(req.query.skip)  : 0
        let page  = req.query.page  ? parseInt(req.query.page)  : undefined

        if (limit && !page) page = 0

        if (page && limit) {
            skip = limit * page
        }

        if (limit) opts.limit = limit
        if (skip) opts.skip = skip
        
        try {
            if ( req.query.sort )
                opts.sort = JSON.parse( req.query.sort )
        } catch (error) {
            delete opts.sort
        }
        
        let users
        let query = {}
        Object.assign(query, req.query)

        delete query.q

        if (q) { 
            query.$or =[ 
                { firstname:{$regex: `(^${q}.*)|(^.*\s${q}.*)`, $options: 'i' }},
                { lastname:{$regex:`(^${q}.*)|(^.*\s${q}.*)`, $options: 'i'}} 
            ]
        }
        

        users = await User.find(query, null, opts).exec()

        let next    
        let prev
        let base
        let total = await User.countDocuments(query)

        if ( total > skip + users.length ) {
            let query = {}
            let page = req.query.page ? parseInt(req.query.page) + 1 : 1
            query = Object.assign(query, req.query)
            if (page) query.page = page
            next = req.protocol + '://' + req.get('host') + req.originalUrl.split('?').shift() + '?' + qs.encode(query)
        }

        if ( page ) {
            let query = {}
            let page = req.query.page ? parseInt(req.query.page) - 1 : 0
            query = Object.assign(query, req.query)
            if (typeof page !== "undefined") query.page = page
            prev = req.protocol + '://' + req.get('host') + req.originalUrl.split('?').shift() + '?' + qs.encode(query)
        }

        if ( true ) {
            let query = Object.assign({}, req.query)
            delete query.page
            delete query.skip
            base = req.protocol + '://' + req.get('host') + req.originalUrl.split('?').shift() + '?' + qs.encode(query)
        }

        let totalPages
        if ( limit && total ) {
            totalPages = Math.ceil(total / limit)
        }
        
            res.json({data:users, next, prev, total, page, base, totalPages})
        }

}

