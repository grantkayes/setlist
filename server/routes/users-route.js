// Import express
const express = require('express')
// Import users controller
const usersController = require('./../controllers/users-controller.js')
// Create express router
const router = express.Router()
// Create rout between usersController and '/all' endpoint
// Note:
// Main route (in server.js) for users
// is set to '/users'
// This means that all users routes
// will be prefixed with /users'
// i.e.: '/all' will become '/users/all'
router.get('/all', usersController.usersGetAll)

router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
})
// Export router
module.exports = router
