const { EndpointNotFound, isHttpError }= require('../helpers/errors')

module.exports.catchErrors = function(error, req, res, next) {
    if (!error) next()
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
}

module.exports.notFound = function(req, res) {
    throw new EndpointNotFound()
}