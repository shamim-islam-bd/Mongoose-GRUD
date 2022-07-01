const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo"
    }
  ]
});




module.exports = todoSchema;