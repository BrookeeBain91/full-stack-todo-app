const mongoose = require("mongoose");

//Schema -> a structure of our document (equivalent table in Relational Database)
const TodoSchema = mongoose.Schema({
    // id: {type: Number, required: true}
    text: {type: String, required: true}
})

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
