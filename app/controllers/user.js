const User = require('../models/user');

exports.getUsers = function(req, res) {
  winston.info('User Controller - getUsers [ req.query | %s ]', util.inspect(req.query));

  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
};

exports.createUser = function(req, res) {
  winston.info('User Controller - createUser [ req.body | %s ]', util.inspect(req.body));

  const user     = new User();

  user.name      = req.body.name;
  user.username  = req.body.username;
  user.password  = req.body.password;

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        return res.json({
          success: false,
          message: 'A user with that username already exists.'
        });
      } else {
        return res.send(err);
      }
    }

    res.json({ 
      success: true,
      message: 'User created!'
    });
  });
} 

exports.getUser = function(req, res) {
  winston.info('User Controller - getUser [ req.params | %s ]', util.inspect(req.params));

  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });  
};

exports.updateUser = function(req, res) {
  winston.info('User Controller - updateUser [ req.params | %s ] - [req.body | %s]', 
    util.inspect(req.params),
    util.inspect(req.body));

  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);      
    }

    if (req.body.name)     { user.name     = req.body.name;     }
    if (req.body.username) { user.username = req.body.username; }
    if (req.body.password) { user.password = req.body.password; }

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
        success: true,
        message: 'User udpated!'
      });
    });

  });
};

exports.deleteUser = function(req, res) {
  winston.info('User Controller - deleteUser [ req.params | %s ]', util.inspect(req.params));

  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json({
      success: true,
      message: 'User deleted!'
    });
  });
};

exports.me = function(req, res) {
  winston.info('User Controller - me [ req.params | %s ]', util.inspect(req.params));

  res.send(req.decoded);
}