var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var deepPopulate = require('mongoose-deep-populate');

var reportSchema = mongoose.Schema({

   title: String,
   date : String,
   body : String,
   author : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   subreport : [{type: mongoose.Schema.Types.ObjectId, ref : 'Report'}],
   backupBody : String,
   final : String,
   isCompleted : {type: Boolean, default: false}
   
});


reportSchema.plugin(deepPopulate);

//make it modular and pass it to server.js
module.exports = mongoose.model('Report', reportSchema);