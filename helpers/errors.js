class HttpError { }

class NotFoundError extends HttpError{
    constructor(attribute) {
        super(attribute)
        this.message = `${attribute} wasn't found`
        this.name = "NotFound"
        this.attribute = attribute
        this.status = 404
    }
    toJSON = function() {
        const errors = {}
        errors[this.attribute] = this.message
        let json = {
            name: this.name,
            message: this.message,
            status: this.status,
            errors
        }
        return json
    }
}

class EndpointNotFound extends HttpError {
    constructor(url) {
        super(url)
        if (url)
            this.message = `I'm sorry. The endpoint ${url} doesn't exist`
        else 
            this.message = "I'm sorry. This endpoint doesn't exist"
        this.name = "EndpointNotFound"
        this.status = 404
    }
    toJSON = function() {
        return {
            message: this.message,
            name: this.name,
            status: this.status
        }
    }
}

class MissingAttributesError extends HttpError {

    constructor(...attributes) {
        super(attributes.join(', ') + ' fields/s was expected')
        this.attributes = attributes
        this.status = 400
        this.name = "MissingAttributesError"
    }

    toJSON = function() { 
        const errors = {}
        for (const attribute of this.attributes) {
            errors[attribute] = `Attribute ${attribute} was expected`
        }
        const json = {
            name: this.name,
            status: this.status,
            message: this.message,
        }
        return json 
    }
    
}

class TimeOutError extends HttpError {

    constructor(){
        super( 'El servicio no ha respondido a tiempo' )
        this.status = 504
        this.name = "TimeOutError"
        this.message = 'El servicio no ha respondido a tiempo'
    }

    toJSON = () => ({
        name: this.name,
        message: this.message,
        status: this.status
    })

}

class ExpectedTypeError extends HttpError {
    constructor(attr, expected, given) {
        let mensaje = `${attr}: se esperaba un valor de tipo ${expected}.`
        if (expected) mensaje += ` En su lugar se obtuvo un valor de tipo ${given}.`
        super(mensaje)
        this.name = 'ExpectedTypeError'
        this.message = mensaje
        this.status = 400
    }

    toJSON = () => ({
        name: this.name,
        message: this.message,
        status: this.status
    })
}

class FileNotFoundError extends HttpError {
    constructor(route) {
        let message = `The file ${route} doesn't exist.`
        super( message )
        this.message = message
        this.name = "FileNotFoundError"
        this.status = 404
    }

    toJSON = () => ({
        name: this.name,
        message: this.message,
        status: this.status
    })

}

class LanguageNotSupportedError extends HttpError {
    
    constructor(lang) {
        let message = `Language '${lang}' is not currently supported`
        super( message )
        this.name = 'LanguageNotSupportedError'
        this.message = message
        this.status = 400
    }

    toJSON = () => ({
        name: this.name,
        message: this.message,
        status: this.status
    })

}

function isHttpError(error) {
    return error instanceof HttpError
}

module.exports = {
    isHttpError,
    ExpectedTypeError,
    TimeOutError,
    MissingAttributesError,
    EndpointNotFound,
    NotFoundError,
    LanguageNotSupportedError,
    FileNotFoundError
}