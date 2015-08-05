var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


var UserSchema = mongoose.Schema({

   
       email        : { type: String, unique: true, lowercase: true},
  	   password     : String,
  	   tokens       : Array,
  	   
  	   profile:     {
	   firstName    : {type: String, default: "Empty"}, 
	   lastName     : {type: String, default: "Empty"},
	   dob          : {type: String, default: "Empty"},
	   department   : {type: String, default: "Empty"},
	   position     : {type: String, default: "Empty"}
	   },
	   
	   forms_created:[{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}],
	   forms_incomplete :[{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}],
	   forms_completed : [{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}],
     forms_container : {
      title: {type: String, default: "Empty"},
      date: {type: Date},
      joinList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}]
    },
	   lackeys      :[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	   });


UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    })
  }
};

/**
 * Statics
 */

UserSchema.statics = {}



module.exports = mongoose.model('User', UserSchema);