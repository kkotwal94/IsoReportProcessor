var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in'});
      res.end('Success');
    });
  })(req, res, next);
};

/**
 * GET All Users
 */
exports.getUsers = function(req, res) {
      User.find({}, function (err, users) {
            res.json(users);
        });
};
/**
 * GET Single User
 */
exports.getSingleUser = function(req, res) {
      var id = req.params.id;
      User.findById(id, function (err, users) {
            res.json(users);
        });
};

exports.getMyProfile = function(req, res) {
      var id = req.user._id;
      User.findById(id, function (err, users) {
            res.json(users);
        });
};

/**
 * GET all employees who belong to that user
 */
exports.getEmployees = function(req, res) {
   var id = req.user._id;
   var array = [];
        var num_procced = 0;
        User.findById(id, function (err, user) {
            if (!err) {
                var total = user.local.lackeys.length;
                for (var i = 0; i < total; i++) {
                    User.findById(user.local.lackeys[i], function (err, usey) {
                        array.push(usey);
                        num_procced = num_procced + 1;
                        console.log(num_procced);
                        
                        if (total === num_procced) {
                            console.log("Hit");
                            res.json(array);
                        }
                    });
                }
    
            }
        });
};

/**
 * POST Add a employee who belongs to that user
 */
exports.addEmployee = function(req, res) {
  var id = req.body.id;
        User.findById(req.user._id, function (err, user) {
            User.findById(id, function (err, usey) {
                if (err) throw err;
                user.local.lackeys.push(usey);
                user.save();
            });
        });
        res.json(req.body);
  
};

/**
 * POST Remove employee who belongs to that user
 */
exports.removeEmployee = function(req, res) {
  var id = req.body._id;
        User.findById(req.user._id, function (err, user) {
            for (var i = 0; i < user.local.lackeys.length; i++) {
                
                if (id == user.local.lackeys[i]) {
                    console.log("hit");
                    console.log(user.local.lackeys[i]);
                    user.local.lackeys.splice(i, 1);
                    user.save();
                }
            }
        });
        res.json(req.body);
  
};

/**
 * GET /logout
 */
exports.getLogout = function(req, res, next) {
  // Do email and password validation for the server
  console.log("You have been logged out");
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
      
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.redirect('/');
      });
    });
  });
};