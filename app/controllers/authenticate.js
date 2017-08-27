const User = require('../models/user');

exports.authenticate = function(req, res) {
  winston.info('AuthController Controller - authenticate [ req.body | %s ]', util.inspect(req.body));

  User.findOne({
    username: req.body.username
  }).select('name username password').exec(function(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({
        success: false,
        message: 'User not found!'
      });
    } else if (user) {
      const validPassword = user.comparePassword(req.body.password);

      if (!validPassword) {
        res.json({
          success: false,
          message: 'Wrong password!'
        });
      } else {
        const token = jsonwebtoken.sign({
          name: user.name,
          username: user.username
        }, nconf.get('TOKEN_SECRET'), {
          expiresIn: '24h'
        });

        res.json({
          success: true,
          message: 'User authenticated',
          token: token
        });
      }
    }
  });
};