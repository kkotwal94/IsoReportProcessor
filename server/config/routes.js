/**
 * Routes for express app
 */
var report = require('../controllers/reports');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Report = mongoose.model('Report');
// Import the webpack emitted bundle
var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.get('/logout', users.getLogout);

 
  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go 
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  //app.get('/auth/google', passport.authenticate('google', { scope: [
  //      'https://www.googleapis.com/auth/userinfo.profile',
  //     'https://www.googleapis.com/auth/userinfo.email'
   //   ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  //app.get('/auth/google/callback',
  //  passport.authenticate('google', {
   //   successRedirect: '/',
   //   failureRedirect: '/login'
   // }));

  // topic routes
  app.get('/report', report.all);

  app.post('/addReport', function(req, res) {
    report.add(req, res);
  });

  app.post('/subreport', function(req, res) {
    report.addSubReport(req, res);
  });

  app.put('/report', function(req, res) {
    report.update(req, res);
  });

  app.post('/report', function(req, res) {
    report.remove(req, res);
  });

  app.get('/myreports', function(req, res) {
    report.allMyReports(req, res);
  });

  app.get('/report/:singlereports', function(req, res) {
    report.singleReport(req,res);
  });

  app.post('/singleReportEdit', function(req, res) {
    report.edit(req, res);
  });

  app.get('/allUsers', function(req, res) {
    users.getUsers(req, res);
  });

  app.get('/myProfile', function(req, res) {
    users.getMyProfile(req, res);
  });

  app.get('/allUsers/:id', function(req, res) {
    users.getSingleUser(req, res);
  });

  app.get('/myEmployees', function(req, res) {
    users.getEmployees(req, res);
  });

  app.post('/complete', function(req, res) {
    report.completed(req, res);
  });

  app.post('/incomplete', function(req, res) {
    report.incomplete(req, res);
  });

  app.post('/addEmployee', function(req, res) {
    users.addEmployee(req, res);
  });

  app.post('/handleEmployee', function(req, res) {
    users.handleEmployee(req, res);
  });

  app.post('/removeEmployee', function(req, res) {
    users.removeEmployee(req, res);
  });

  app.post('/updateProfile', function(req, res) {
    users.updateMyProfile(req, res);
  });
  app.get('/finalView/:form', function(req, res) {
    report.finalView(req, res);
  });


  // Retrieves all topics on any endpoint for demonstration purposes
  // If you were indeed doing this in production, you should instead only
  // query the Topics on a page that has topics
   
  app.get('*', function(req, res, next) {
    Report.find({}).exec(function(err, topics) {
      if(!err) {
        var topicmap = _.indexBy(topics, 'id');
        // We don't want to be seeding and generating markup with user information
        var user = req.user ? { authenticated: true, isWaiting: false } : { authenticated: false, isWaiting: false };
        // An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during
        // that request/response cycle (if any). Otherwise, this property is identical to app.locals
        // This property is useful for exposing request-level information such as request path name, authenticated user, user settings, and so on.
        // pass in data to be seeded into the TopicStore
        res.locals.data =  {
          ReportStore: { topics: topicmap},
          UserStore: { user: user }
        };
        next();
      }else {
        console.log('Error in first query');
        res.status(500).send(err);
      }
    });
  });

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  // Exclude any image files or map files
  app.get('*', function (req, res, next) {
    if (/(\.png$|\.map$|\.jpg$)/.test(req.url)) return;
    var html = App(JSON.stringify(res.locals.data || {}), req.url);
    html = html.replace("TITLE", Header.title)
                .replace("META", Header.meta)
                .replace("LINK", Header.link);

    res.contentType = "text/html; charset=utf8";
    res.end(html);
  });

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated())
      return next(); //cuz we want to move on incase we're stuck here

   //if they arent redirect them to the home page
   res.redirect('/');
}


};;