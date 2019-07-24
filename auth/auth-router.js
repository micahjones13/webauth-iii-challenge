const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const generateToken = require('../auth/generate-token.js');

const secrets = require('../config/secrets.js');
const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    console.log('made it to register');
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token after successful login
        const token = generateToken(user);
        console.log(token);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//probably put in a diff file
function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  // const jwtSecret = process.env.JWT_SECRET || 'keep it secret, keep it safe!';
  const jwtOptions = {
    expiresIn: '1d' //1 day 
  }
  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions)
}

module.exports = router;
