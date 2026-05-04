const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    file: String,
    userId: String
});

module.exports = mongoose.model("Book", BookSchema);