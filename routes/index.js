const { isHttpError } = require('../helpers/errors')
const { notFound, catchErrors } = require('../helpers/catch-requests')
const router = require('express').Router()

// Routes endpoint
router.use('/api/users', require('./users'))

router.use('/api/*', function(error, req, res, next) {
    if ( isHttpError(error) ) {
        res.status(error.status).json(error)
    } else {
        res.status(500).json({
            message: `I'm sorry, an unexpected error has occurred. Please contact to the system owner to resolve it. Thank you`,
            name: error.name || undefined,
            error_name: error.name || undefined,
            error_message: error.message || undefined,
            status: 500
        })
    }
} )


router.use( notFound )
router.use( catchErrors )

module.exports = app => app.use(router)

