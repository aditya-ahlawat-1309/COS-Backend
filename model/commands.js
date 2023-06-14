// const express = require("express");
// const { Folder, User, Text } = require("../Database/schema");
// const app = express();
// app.use(express.json());

// const commandData = async (req, res) => {
//   try {
//     //  const { authorization } = re;
//     const [, token] = req.body.Authorization.split(" ");
//     const [password, username] = token.split(":");
//     const command = req.body.command;
//     const user = await User.findOne({ username }).exec();
//     if (!user) {
//       res.status(403);
//       res.json({
//         message: "invalid access",
//       });
//       return;
//     }

//     if(command.substring(0,5) === ('mkdir'))
//     {
//    const keyword = "mkdir ";
//    const content = command.substring(command.indexOf(keyword) + keyword.length);
//     const folder = await Folder.findOne({ userId: user._id }).exec();
//       await Folder.create({
//         userId: user._id,
//         name: content,
//     })
// }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//  commandData
// };


const express = require("express");
const { Folder, User, Text } = require("../Database/schema");
const app = express();
app.use(express.json());

const commandData = async (req, res) => {
  try {
    const [, token] = req.body.Authorization.split(" ");
    const [password, username] = token.split(":");
    const command = req.body.command;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403);
      res.json({
        message: "Invalid access",
      });
      return;
    }

    if (command.substring(0, 5) === "mkdir") {
      const keyword = "mkdir ";
      const content = command.substring(
        command.indexOf(keyword) + keyword.length
      );
      const folder = await Folder.findOne({ userId: user._id }).exec();
      await Folder.create({
        userId: user._id,
        name: content,
      });
      res.json({ message: `Folder "${content}" created successfully` });
    } else if (command.substring(0, 2) === "mv") {
      const keyword = "mv ";
      const updateParams = command.substring(
        command.indexOf(keyword) + keyword.length
      );
      const paramsArray = updateParams.split(" ");
      const folderName = paramsArray[0];
      const updatedName = paramsArray[1];

      const folder = await Folder.findOne({
        userId: user._id,
        name: folderName,
      }).exec();
      if (!folder) {
        res.status(404);
        res.json({ message: `Folder "${folderName}" not found` });
        return;
      }

      folder.name = updatedName;
      await folder.save();
      res.json({ message: `Folder "${folderName}" updated successfully` });
    } else if (command.substring(0, 2) === "ls") {
      const keyword = "ls ";
      const folderName = command.substring(
        command.indexOf(keyword) + keyword.length
      );
      const folder = await Folder.findOne({
        userId: user._id,
        name: folderName,
      }).exec();
      if (!folder) {
        res.status(404);
        res.json({ message: `Folder "${folderName}" not found` });
        return;
      }
      res.json({ folder });
    } else if (command.substring(0, 2) === "rm") {
      const keyword = "rm ";
      const folderName = command.substring(
        command.indexOf(keyword) + keyword.length
      );
      const folder = await Folder.findOne({
        userId: user._id,
        name: folderName,
      }).exec();
      if (!folder) {
        res.status(404);
        res.json({ message: `Folder "${folderName}" not found` });
        return;
      }
      await Folder.deleteOne({ _id: folder._id });
      res.json({ message: `Folder "${folderName}" deleted successfully` });
    } else {
      res.status(400);
      res.json({ message: "Invalid command" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  commandData,
};
