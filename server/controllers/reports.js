var mongoose = require('mongoose');
var _ = require('lodash');
var Report = mongoose.model('Report');
var User = mongoose.model('User');
var Promise = require('bluebird');
    Promise.promisifyAll(mongoose);

/**
 * List
 */
exports.all = function(req, res) {
  Report.find({}).exec(function(err, reports) {
    if(!err) {
      res.json(reports);
    }else {
      console.log('Error in first query');
    }
  });
};

//all of that users reports
exports.allMyReports = function(req, res) {
var id = req.user._id;
        var totalproc = 0;
        var dupe = [];
        Report.find({"author" : id}, function (err, form) {
            dupe = form;
            
            dupe.forEach(function (person) {
                
                User.findById(person.author, function (err, user) {
                    if (!err) {
                        
                        console.log("Author: " + person.author[0]);
                        person.author[0] = user.local.firstName + " " + user.local.lastName;
                        
                        totalproc = totalproc + 1;
      
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
      
                );
            });
    
    
        });
};

/**
 * GET a singlereport
 */
exports.singleReport = function(req, res) {
  var id = req.params.singlereports;
  Report.findById(id, function(err, reports) {
    res.json(reports);
  });
};

//complete a report or mark as
exports.completed = function(req, res) {
  var id = req.body._id;
  Report.findById(id, function(err, reports) {
    reports.isCompleted = true;
    reports.save();
    res.json(reports);
  });
};

//mark as incomplete
exports.incomplete = function(req, res) {
  var id = req.body._id;
  Report.findById(id, function(err, reports) {
    reports.isCompleted = false;
    reports.save();
    res.json(reports);
  });
};
/**
 * Add a Report
 */
exports.add = function(req, res) {
  var form = new Report(req.body);
  form.owner = req.user;
  form.save();
  res.json(req.body);
};

/**
 * POST a subreport
 */
exports.addSubReport = function(req, res) {
var id = req.body._id;
        var array = [];
        Report.findById(id, function (err, form) {
            User.findById(form.author, function (err, author) {
                
                form.author[0] = author.local.firstName + " " + author.local.lastName;
                
                array.push(form);
                console.log(array);
                if (form.subform.length == 0) {
                    res.json(array);
                }
                if (form.subform.length != 0) {
                    var total = form.subform.length;
                    var numproc = 0;
                    form.subform.forEach(function (sub) {
                        Report.findById(sub, function (err, subs) {
                            array.push(subs);
                            numproc = numproc + 1;
                            
                            if (numproc == total) {
                                res.json(array);
                            }
                        });
                    });
                }
      
        
            });
      
        });
};

/**
 * Update a report
 */
exports.update = function(req, res) {
  var id = req.user._id;
  var isBody = req.body.body;
  var isTitle = req.body.title;
  var isCompleted = req.body.isCompleted;

  Report.findById(id, function(err, reports) {
    reports.body = isBody;
    reports.title = isTitle;
    reports.isCompleted = isCompleted;
    reports.save();
    res.json(req.body);
  });

  
};

/**
 * 
 */


/**
 * Remove a Report
 */
exports.remove = function(req, res) {
  var query = { id: req.body.id };
  Report.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};


/**
 * Get Final Tree View
 */

exports.finalView = function(req, res) {
 var id = req.params.form; //we get our id from our route/link
        Form.findById(id).deepPopulate('subform.subform.subform.subform.subform.subform').execAsync() //i am looking for a form, using deeppopulate funct we fill out subforms to the 6th level, because I don't think there will be more than 6 levels, and if so we can just add in more..
        .then(function (doc) { //for the doc that the async call gets
            
            res.json(doc); //we send that doc with the populated fields  
        }).catch(function (err) { //if there is a error than tell us
            res.send('Something is wrong..' + err.message) //err.message holds true error, might be vague
        });
  };