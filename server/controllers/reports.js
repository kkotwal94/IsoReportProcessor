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
      reports.push(req.user._id);
      res.json(reports);
    }else {
      console.log('Error in first query');
    }
  });
};

/*exports.allMyReports2 = function(req, res) {
  var id = req.user._id;
  var totalproc = 0;
  var dupe = [];
  Report.find({}), function(err, form) {
    if(err) {
      throw err;
    }
    else {
      for(var x = 0; x < form.length; x++) {

      } 
    }
  });
}*/
//all of that users reports
exports.allMyReports = function(req, res) {
var id = req.user._id;
        var totalproc = 0;
        var dupe = [];
        Report.find({"author" : id}, function (err, form) {
          if(err) {
            console.log('Error in finding reports');
          }
          else {
            dupe = form;
            
            dupe.forEach(function (person) {
                
                User.findById(person.author, function (err, user) {
                    if (!err) {
                        person.authors[0] = user.profile.firstName + " " + user.profile.lastName;
                        person.save();
                        totalproc = totalproc + 1;
      
                    }
                    if (totalproc == dupe.length) {
                        res.json(dupe);
                    }
                }
      
                );
            });
    
          }
        });
      
};

/**
 * GET a singlereport
 */
exports.singleReport = function(req, res) {
  var id = req.params.singlereports;
  Report.findById(id, function(err, reports) {
    if(err) {
      res.redirect('/404NotFound');
    }
    else {
    res.json(reports);
  }
  });
};

//complete a report or mark as
exports.completed = function(req, res) {
  var id = req.body._id;
  Report.findById(id, function(err, reports) {
    if(err) {
      res.redirect('/404NotFound');
    }
    else {
    reports.isCompleted = true;
    reports.save();
    res.json(reports);
  }
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
  var myDate = Date();
  var form = new Report(req.body);
  form.owner = req.user;
  form.author.push(req.user);
  form.authors[0] = req.user.profile.firstName + " " + req.user.profile.lastName;
  form.date = myDate;
  form.save();
  req.user.forms_created.push(form);
  req.user.save();
  res.json(req.body);
};

exports.edit = function(req, res) {
  var myDate = Date();
  var id = req.body.id;
  Report.findById(id, function(err, form) {
    if(err) {
      res.redirect('/404NotFound');
    }
    else {
    if (req.body.body == "") {
      req.body.body = form.body;
    }
    if (req.body.title == "") {
      req.body.title = form.title;
    }

    form.body = req.body.body;
    form.title = req.body.title;
    form.save();
  }
  });
  res.json(req.body);
}
exports.addSubReport = function(req,res) {
        
        var id = req.body.masterform;
        var subform = new Report();
        var myDate = Date();
        subform.title = req.body.title;
        subform.date = req.body.date;
        subform.date = myDate;
        subform.owner = req.user;
        subform.body = req.body.body;
        subform.save();
        Report.findById(id, function (err, report) {
          if(err) {
            res.redirect('/404NotFound');
          }
          else {
            report.subreport.push(subform);
            subform.parentReport = report;
            report.save();
          }
        });
        User.findById(req.body.id, function (err, user) {
            user.forms_created.push(subform);
            subform.owner = req.user;
            subform.authors[0] = user.profile.firstName + " " + user.profile.lastName;
            subform.author = user;
            subform.save();
        });
        
        res.json(req.body);
    };

exports.assignToEmployee = function(req, res){
  var id = req.body.id;
  var form = new Report();
  var myDate = Date();
  form.title = req.body.title;
  form.date = myDate;
  form.owner = req.user;
  form.body = req.body.body;
  req.user.forms_created.push(form);
  req.user.save();
  User.findById(req.body.id, function(err, user) {
    form.author = user;
    form.authors[0] = user.profile.firstName + " " + user.profile.lastName;
    form.save();
  });
  form.save();
  res.json(req.body);
}
/**
 * get our main reports + subreports
 */
exports.getSubReports = function(req, res) {
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
    if(err) {
      res.redirect('/404NotFound');
    }
    else {
    reports.body = isBody;
    reports.title = isTitle;
    reports.isCompleted = isCompleted;
    reports.save();
    res.json(req.body);
  }
  });

  
};

/**
 * 
 */


/**
 * Remove a Report
 */
exports.remove = function(req, res) {
  var id = req.body.id;
  console.log(req.body.id);
  Report.findByIdAndRemove(id, function(err, data) {
    if(err) {console.log('Error on delete'); res.redirect('/404NotFound');}
    else {
    res.status(200).send('Removed Successfully');
  }
  });
};


/**
 * Get Final Tree View
 */

exports.finalView = function(req, res) {
 var id = req.params.form; //we get our id from our route/link
        Report.findById(id).deepPopulate('subreport.subreport.subreport.subreport.subreport.subreport').execAsync() //i am looking for a form, using deeppopulate funct we fill out subforms to the 6th level, because I don't think there will be more than 6 levels, and if so we can just add in more..
        .then(function (doc) { //for the doc that the async call gets
            
            res.json(doc); //we send that doc with the populated fields  
        }).catch(function (err) { //if there is a error than tell us
            res.send('Something is wrong..' + err.message) //err.message holds true error, might be vague
        });
  };