const express = require("express");
const generateToken = require("../config/generateToken");
const { User } = require("../Database/schema");
const app = express();

app.use(express.json());

const LoginUser =async (req, res) => {
  try{
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid login",
    });
    return;
  }
  res.json({
    _id: user._id,
    username: user.username,
    token: generateToken(user._id)
  });
}
catch(err)
{
  console.log(err);
}
};

module.exports = {LoginUser}