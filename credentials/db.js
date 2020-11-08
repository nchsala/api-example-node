let auth = {
    user: '',
    password: '',
    db: 'api-test',
    dbAuth: '',
    host: '',
    port: ''
}

module.exports.url = [
    auth.user ? 
        `mongodb://${auth.user}:${auth.password}@${auth.host}:${auth.port}/${auth.db}?authSource=${auth.dbAuth}` : 
        `mongodb://localhost:27017/${auth.db}`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
]