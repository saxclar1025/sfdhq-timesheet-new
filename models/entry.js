const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var EntrySchema = new Schema({
  task: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  unitPrice: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true
  },

  overridden: {
    type: Boolean,
    default: false
  },

  note: {
    type: String
  }
});

var Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;