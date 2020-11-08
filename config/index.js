const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const uuid  = require('uuid-v4')
const cors  = require('cors')
const path = require('path')
const fileUpload 	= require('express-fileupload')
const fs = require('fs')

const root = process.cwd()
if ( !fs.existsSync( path.join( root, 'storage') ) ) fs.mkdirSync( path.join( root, 'storage') )

mongoose.connect( ...require('../credentials/db').url )
const SessionMiddleware = session({
    secret: 'AJygdTJJHGFRTYuiytYUIKJGFTYUIiuygfdfg',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600,
        secret: 'bughuBKYUHBkuhnukyjuhNUKYJHNJBYHB'
    }),
    cookie: {
        secure: false,
        maxAge: 43200000,
        httpOnly: true
    },
    genid: () => uuid()
})

/**
 * Configuración global de app 
 * @param {any} app Opciones extra de configuración
 * @param {{withRender?: Boolean, useCors?: Boolean, secure?: Boolean}} opt Opciones extra de configuración
 */
function appFunction(app, opt) {
    // if (opt && opt.secure) secure = true
    if (opt && opt.useCors) app.use( cors({credentials: true, origin: 'http://localhost:3000'}) )
    
    app.use( fileUpload() )
    app.use( express.json() );
    app.use( express.urlencoded({ extended: false }) );
    app.use(SessionMiddleware);
    return { app }
}

module.exports = appFunction
