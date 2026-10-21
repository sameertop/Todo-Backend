import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({}, {
    strict:false
});

const TodoModel = mongoose.model("newtodos", todoSchema);

export default TodoModel
