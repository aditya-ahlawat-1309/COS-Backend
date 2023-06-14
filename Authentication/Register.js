const express = require("express");
const generateToken = require("../config/generateToken");
const { User } = require("../Database/schema");
const app = express();

app.use(express.json());

const registerUser = async (req, res) => {
 try{
  const { username, password } = req.body;
  const userExists = await User.findOne({ username }).exec();
  if (userExists) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  const user = await User.create({ username, password });
  if(user){

    res.status(201).json({
  _id: user._id,
  username : user.username,
  token:generateToken(user._id),
});
  }
  
}
catch(err)
{
  console.log(err);
}
};

module.exports = { registerUser };
