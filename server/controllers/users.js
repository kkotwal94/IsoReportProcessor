var mongoose = require('mongoose');
var _ = require('lodash');
var User = require('../models/user');
var Report = require('../models/report');
var passport = require('passport');
var Report = mongoose.model('Report');
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

     exports.updateMyProfile = function(req, res) {
      var id = req.user._id;
      var didChange = true;
      var didChange2 = true;
      var tracker = 0;
      if (req.body.firstName == "") {
        req.body.firstName = req.user.profile.firstName;
        didChange = false;
      }
      if (req.body.lastName == "") {
        req.body.lastName = req.user.profile.lastName;
        didChange2 = false;
      }
      if (req.body.dob == "") {
        req.body.dob = req.user.profile.dob;
      }
      if (req.body.department == "") {
        req.body.department = req.user.profile.department;
      }
      if (req.body.position == "") {
        req.body.position = req.user.profile.position;
      }

      User.findById(id, function(err, user) {
        console.log("ID: " + id);
        user.profile.firstName = req.body.firstName;
        user.profile.lastName = req.body.lastName;
        user.profile.dob = req.body.dob;
        user.profile.department = req.body.department;
        user.profile.position = req.body.position;
        user.save();
      });
        
        if(didChange == true || didChange2 == true) {
          Report.find({}, function(err, report) {
            report.forEach(function (rep) {
              
               if(String(rep.author[0]) == String(id)) {
                console.log("IF HIT");
                var newAuthorName = req.body.firstName + " " + req.body.lastName;
                rep.authors.set(0, newAuthorName);
                rep.save(function(err) {
                  if (!err) {
                    console.log("Success");
                  }
                  else {
                    console.log(err);
                  }
                });
                console.log(rep);
               }
               tracker = tracker+1;
               if(tracker == report.length){
                console.log(tracker);
                console.log("finish");
                res.json(req.body);
               }
            });
              });
               
        }
        else {
        console.log("Hit");
        res.end();
      }
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
                var total = user.lackeys.length;
                for (var i = 0; i < total; i++) {
                    User.findById(user.lackeys[i], function (err, usey) {
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
exports.handleEmployee = function(req, res) {
  var employee_id = req.body.data;
  var id = req.user._id;
  var count = req.user.lackeys.length - 1;
  console.log(req.body);
  for (var i =0; i < req.user.lackeys.length; i++) {
    if(req.user.lackeys[i] == employee_id) {
      console.log("hit");
      req.user.lackeys.splice(i,1);
      req.user.save();
      res.end();
      return;
    }
  }
  console.log("Hits");
  req.user.lackeys.push(employee_id);
  req.user.save();
  res.end();
};

/**
 * POST Add a employee who belongs to that user
 */
exports.addEmployee = function(req, res) {
  var id = req.body._id;
        User.findById(req.user._id, function (err, user) {
            User.findById(id, function (err, usey) {
                if (err) throw err;
                user.lackeys.push(usey);
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
                    console.log(user.lackeys[i]);
                    user.lackeys.splice(i, 1);
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

/**
exports.updateMyProfile = function(req, res) {
      var id = req.user._id;
      var didChange = true;
      var didChange2 = true;
      var tracker = 0;
      if (req.body.firstName == "") {
        req.body.firstName = req.user.profile.firstName;
        didChange = false;
      }
      if (req.body.lastName == "") {
        req.body.lastName = req.user.profile.lastName;
        didChange2 = false;
      }
      if (req.body.dob == "") {
        req.body.dob = req.user.profile.dob;
      }
      if (req.body.department == "") {
        req.body.department = req.user.profile.department;
      }
      if (req.body.position == "") {
        req.body.position = req.user.profile.position;
      }

      User.findById(id, function(err, user) {
        console.log("ID: " + id);
        user.profile.firstName = req.body.firstName;
        user.profile.lastName = req.body.lastName;
        user.profile.dob = req.body.dob;
        user.profile.department = req.body.department;
        user.profile.position = req.body.position;
        user.save();
      });
        
        if(didChange == true || didChange2 == true) {
          Report.find({}, function(err, report) {
            report.forEach(function (rep) {
              
               if(String(rep.author[0]) == String(id)) {
                console.log("IF HIT");
                rep.authors[0] = req.body.firstName + " " + req.body.lastName;
                rep.save(function(err) {
                  if (!err) {
                    console.log("Success");
                  }
                  else {
                    console.log(err);
                  }
                });
                console.log(rep);
               }
               tracker = tracker+1;
               if(tracker == report.length){
                console.log(tracker);
                console.log("finish");
                res.json(req.body);
               }
            });
              });
               
        }
        else {
        console.log("Hit");
        res.end();
      }
};
**/