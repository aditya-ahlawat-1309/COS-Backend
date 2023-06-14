const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

// const folderSchema = new Schema({
//   name: String,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// // Text Schema and Model
const textSchema = new Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  text: String,
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 'file' or 'folder'
  parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  content: { type: String }, // Only applicable for files
  createdAt: { type: Date, default: Date.now },
});

// Define the schema for a folder
const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentFolder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});


// User Schema and Model
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  isAdmin: Boolean
});

const centralIconSchema = new Schema({
  iconname: { type: String, unique: true },
  link: String,
  image: String,
});

const iconSchema = new Schema({
  name: String,
  link: String,
  image: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


const User = mongoose.model("User", userSchema);
const Folder = mongoose.model("Folder", folderSchema);
const File = mongoose.model("File", fileSchema);
const Text = mongoose.model("Text", textSchema);
const Icon = mongoose.model("Icon",iconSchema);
const CentralIcon = mongoose.model("central",centralIconSchema);

module.exports = {
  User,
  Folder,
  File,
  Icon,
  CentralIcon,
  Text
};
