const router = require('express').Router()
const controller = require('../controllers/users')
const middlewares = require('../middlewares')

router.post('/', middlewares.onlyAdmin, controller.postOne )
router.post('/first-admin', controller.postFirstAdmin )
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/isLogged', controller.isLogged)
router.get('/', controller.search)

router.route('/:id')
    .get( middlewares.onlyAdmin, controller.getOne ) 
    .put( middlewares.onlyAdmin, controller.putOne )
    .delete( middlewares.onlyAdmin, controller.deleteOne )


module.exports = router