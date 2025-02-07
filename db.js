import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
});

const todoSchema = new Schema({
  title: String,
  description: String,
  isCompleted: Boolean,
  userId: Schema.Types.ObjectId,
});

export const UserModel = mongoose.model("users", userSchema);
export const TodoModel = mongoose.model("todos", todoSchema);
