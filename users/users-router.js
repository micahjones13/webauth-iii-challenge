const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  console.log(req.jwtToken);
  const department = req.jwtToken.department; //restricted middleware insures that there is a token
  

  Users.find(department) //you could pass in department here to filter by department
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
