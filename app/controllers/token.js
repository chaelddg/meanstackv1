exports.verify = function(req, res, next) {
  winston.info('AuthController Controller - verify');

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jsonwebtoken.verify(token, nconf.get('TOKEN_SECRET'), function(err, decoded) {
      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;

        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};