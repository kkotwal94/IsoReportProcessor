var mongoose = require('mongoose');
var _ = require('lodash');
var Report = mongoose.model('Report');
var User = mongoose.model('User');
var Promise = require('bluebird');
    Promise.promisifyAll(mongoose);

var dupe = [];
//mongoose.set('debug', true)

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

exports.popped = function(req, res) {
  User.findById(req.user._id).populate('forms_container.joinList').exec(function(err, user) {
    res.json(user.forms_container);
  });
}


exports.join = function(req, res){
  User.findById(req.user._id, function(err, user) {
     var dupe = []; //placeholder array
     var arr = user.forms_container.joinList;
     var title = user.forms_container.title;
     var myDate = Date();
     var newDoc = new Report();
     var tracker = 0;
     newDoc.author = req.user;
     var authorName = req.user.profile.firstName + " " + req.user.profile.lastName;
     console.log(authorName);
     newDoc.authors.set(0, authorName);
     newDoc.date = myDate;
     newDoc.owner = req.user;
     newDoc.title = title;
     //console.log(newDoc);
     newDoc.save();
     arr.forEach(function (rep) {
      console.log(rep);
                  Report.findById(rep).deepPopulate('subreport.subreport.subreport.subreport.subreport.subreport').execAsync()
                .then(function(doc) {
                    //console.log(doc);
                    dupe.push(doc);
                    treeCycle(doc, dupe);
                    console.log(dupe);

                    tracker = tracker + 1;

                    if (tracker == arr.length) {
                        //console.log(dupe); //returns [];
                        var counter = 0;
                        var masterbody ="";
                        for (var x = 0; x < dupe.length; x++) {
                            masterbody = masterbody + " " + dupe[x].body;
                            counter = counter + 1;
                        }
                        if (counter == dupe.length) {
                            newDoc.body = masterbody;
                            console.log(newDoc.body);
                            newDoc.save();
                            res.json(newDoc);
                        }
                    }

                }).catch(function(err) {
                    throw err;
                });
        });

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
                        var newAuthor = user.profile.firstName + " " + user.profile.lastName;
                        person.authors.set(0, newAuthor);
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
  var id = req.body.data;
  Report.findById(id, function(err, reports) {
    if(err) {
      res.redirect('/404NotFound');
    }
    else {
      console.log(reports);
    if(reports.isCompleted == true) {
    reports.isCompleted = false;
    reports.save();
    res.json(reports);
  }
    else {
      reports.isCompleted = true;
      reports.save();
      res.json(reports);
    }
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
  var newAuthor = req.user.profile.firstName + " " + req.user.profile.lastName;
  form.authors.set(0, newAuthor);
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
      if(!err) {
      console.log(form);
    if (req.body.body == "" && form != null) {
      req.body.body = form.body;
    }
    if (req.body.title == "" && form != null) {
      req.body.title = form.title;
    }
  if(form != null) {
    form.body = req.body.body;
    form.title = req.body.title;
    form.save();
    res.json(req.body);
  }
  else {
    console.log('Hit');
    res.redirect('/404NotFound');
  }
}
}
  });
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
            if (report != null) {
            report.subreport.push(subform);
            subform.parentReport = report;
            report.save();
            }
          }
        });
        User.findById(req.body.id, function (err, user) {
            user.forms_created.push(subform);
            subform.owner = req.user;
            var newauthor = user.profile.firstName + " " + user.profile.lastName;
            subform.authors.set(0, newauthor);
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
    var newauthor = user.profile.firstName + " " + user.profile.lastName;
    form.authors.set(0, newauthor);
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
                 authorname = author.local.firstName + " " + author.local.lastName;
                form.author.set(0, authorname);
                
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
      if(data != null) {
    res.status(200).send('Removed Successfully');
  }
}
  res.end();
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

  exports.joinList = function(req, res) {
    var id = req.user._id;
    var report_id = req.body.data;
    var dupe = 0;
    User.findById(id, function(err, user) {
     var depth = user.forms_container.joinList.length + 1;
      console.log(user.forms_container.joinList);
       for (var i = 0; i < depth; i++) {
           if(user.forms_container.joinList[i] == report_id){
            console.log("hit");
            console.log(user.forms_container.joinList);
              user.forms_container.joinList.splice(i,1);
              user.save();
              res.json(req.body);
           }
           else {
            dupe = dupe + 1;
            console.log("Else staement hit");
            console.log(dupe);
            console.log("userform lenght: " + depth);
            if(dupe == depth) {
              console.log("Complete staement hit");
            user.forms_container.joinList.push(report_id);
            user.save();
            res.json(req.body);
          }
           }

       }
            console.log(user.forms_container.joinList);
    });

  };

  exports.setTitle = function(req, res) {
    var id = req.user._id;
    var title = req.body.title;
    User.findById(id, function(err, user) {
      if(title == "") {
        title = user.forms_container.title;
      }
      user.forms_container.title = title;
      user.save();
      res.end();
    });
  };

 exports.removeJoinDoc = function(req, res){
   var id = req.user._id;
   var reportid = req.body.id;
   User.findById(id, function(err, user) {
   var length = user.forms_container.joinList.length;
   var count = 0;
   console.log(reportid._id);
   console.log(user.forms_container.joinList);
     for (var i = 0; i < length; i++) {
        if(user.forms_container.joinList[i] == reportid._id){
          console.log("hit");
           user.forms_container.joinList.splice(i, 1);
           user.save();
           res.end();
        }
     }
   });
 };

 exports.removeallJoinDoc = function(req, res){
  var id = req.user._id;
  User.findById(id, function(err, user) {
     user.forms_container.joinList = [];
     user.save();
     res.end();
  });
 };
/**
 var depth = user.forms_container.joinList.length + 1;
      console.log(user.forms_container.joinList);
       for (var i = 0; i < depth; i++) {
           if(user.forms_container.joinList[i] == report_id){
            console.log("hit");
            console.log(user.forms_container.joinList);
              user.forms_container.joinList.splice(i,1);
              user.save();
              res.end();
           }
           else {
            dupe = dupe + 1;
            console.log("Else staement hit");
            console.log(dupe);
            console.log("userform lenght: " + depth);
            if(dupe == depth - 1) {
              console.log("Complete staement hit");
            user.forms_container.joinList.push(report_id);
            user.save();
            res.end();
          }
           }

       }
            console.log(user.forms_container.joinList);

       user.forms_created.joinList = [];
       console.log(user.forms_created.joinList);
      user.save();
      res.end();
       **/

       function contains(arr, id) {
    for (var i = 0; i < arr.length; i++) {
       
        
        if (arr[i] == id) {
            
            arr.splice(i, 1);
            
            return true;
        }
    }
    
    return false;
}



/** Works but is slower in updating names
exports.all = function(req, res) {
  var totalproc = 0;
  Report.find({}).exec(function(err, reports) {
    if(!err) {
      reports.forEach(function (person) {
        User.findById(person.author, function(err, user) {
          if (!err) {
                        person.authors[0] = user.profile.firstName + " " + user.profile.lastName;
                        person.save();
                        totalproc = totalproc + 1;
      
                    }
          if(totalproc == reports.length) {
             reports.push(req.user._id);
             res.json(reports);
          } 
        });
      });
    }else {
      console.log('Error in first query');
    }
  });
};
**/

function treeCycle(doc, arr) {
  if(doc.subreport.length != 0) {
    for (var x = 0; x < doc.subreport.length; x++){
      arr.push(doc.subreport[x]);
      //console.log(arr);
      if(doc.subreport[x].subreport.length != 0) {
        treeCycle(doc.subreport[x], arr);
      }
    }
  }
  else {
    return arr;
  }
};