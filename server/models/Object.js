const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  completed: {
    type: String,
  },
});

module.exports = mongoose.model("Datas", ObjectSchema);
