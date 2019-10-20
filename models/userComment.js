const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//let now = new Date()
//Create headline schema and model//
const userCommentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },

  comment: {
    subject: String,
    type: String,
    date: {
      type: Date,
      default: Date.now
    },
    
  }
});
const Usercomment = mongoose.model("userComment", userCommentSchema);

module.exports = Usercomment;