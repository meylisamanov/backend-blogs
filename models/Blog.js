const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const BlogsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The contract ID field is required'],
    unique: true
  },
  content: {
    type: String,
    required: [true, 'The premium field is required']
  },
  comment: [{
    body: String, 
    date: Date
  }]
});

module.exports = Blog = mongoose.model("blogs", BlogsSchema);