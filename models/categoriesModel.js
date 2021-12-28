const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, `A Category must have a Name`],
  },
  icon: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
