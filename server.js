const express = require("express");
const dotenv = require("dotenv");
const { DB } = require("./Database/mongo");
const { routerFolder } = require("./Router/router");
const app = express();



dotenv.config();

///////////////////////////////////////////////////////////////////////////////

//Cors Configuration - Start
// always use this to remove CORS Error

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
//Cors Configuration - End

//////////////////////////////////////////////////////////////////////////////////

app.use(express.json());
app.use("/api",routerFolder);

const PORT = process.env.PORT || 8000;
  DB();
app.listen(PORT, (req, res) => {
  try{

  console.log(`Listening on PORT = ${PORT}`);
  }
  catch(err)
  {
    console.log(err);
  }
});
