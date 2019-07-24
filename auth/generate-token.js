module.exports = {
    generateToken
}

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