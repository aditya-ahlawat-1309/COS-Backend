const express = require("express");
const { Folder, User, File, Text } = require("../Database/schema");
const app = express();
app.use(express.json());

// const folderData =async(req,res) => {
//     try{
    // const { authorization } = req.headers;
    // //console.log(req.headers.authorization.split(" "));
    // const username = authorization.split(" ")[1].split(":")[1];
//   const Items = req.body;
  
//   const user = await User.findOne({ username }).exec();
//  // console.log(user);
//   //console.log(username);
//   if (!user) {
//     res.status(403);
//     res.json({
//       message: "invalid access",
//     });
//     return;
//   }

//   const folder = await Folder.findOne({ userId: user._id }).exec();
//  //console.log(Items.body);
//   if (!folder) {
//     await Folder.create({
//       userId: user._id,
//       folder: Items.body,
//     });
//   } else {
//     folder.folder = Items.body;
//     await folder.save();
//   }
//   res.json(Items.body);

// } catch(err)
// {
//     console.log(err);
// }
// }

// // const countData =async(req,res) => {
// //     const total = History.collection.count();
// //     res.json(total);
// // };


// const getFolderData = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     //console.log(req.headers.authorization.split(" "));
//     const username = authorization.split(" ")[1].split(":")[1];
//     const user = await User.findOne({ username }).exec();
//      //console.log(user);
//     if (!user) {
//       res.status(403);
//       res.json({
//         message: "invalid access",
//       });
//       return;
//     }
//    const  { folder } = await Folder.findOne({ userId: user._id }).exec();
//    console.log(folder);
//    res.json(folder);
//   } catch (err) {
//     console.log(err);
//   }
// };



const folderData =  async (req, res) => {
  try {
      //  const { authorization } = re;
       const [, token] = req.body.Authorization.split(" ");
       const [password, username] = token.split(":");
       const Items = req.body.name;
       const user = await User.findOne({ username }).exec();
       if (!user) {
         res.status(403);
         res.json({
           message: "invalid access",
         });
         return;
       }
    // const { name } = req.body;
    // const { userId } = user.user._id;
    // const folder = new Folder({ name, userId });
    // await folder.save();
      const folder = await Folder.findOne({ userId: user._id }).exec();
      //console.log(Items.body);
      if (!folder) {
        await Folder.create({
          userId: user._id,
          name: Items,
        });
      } else {
         await Folder.create({
           userId: user._id,
           name: Items,
         });
      }
      // res.json(Items.body);
    // res.status(201).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  //  console.log(req);
    //  const [, token] = req.body.Authorization.split(" ");
    //  const [password, username] = token.split(":");
    //  console.log(token);
    //  console.log(username);
    //  console.log(password);
    //  const user = await User.findOne({ username }).exec();
    //  console.log(user);
    //  if (!user) {
    //    res.status(403);
    //    res.json({
    //      message: "invalid access",
    //    });
    //    return;
    //  }
    //  console.log(user);


   
    // const folder = await Folder.findOne({ name: folderId, userId: user._id });
    // if (!folder) {
    //   res.status(404).json({ message: "Folder not found" });
    //   return;
    // }
const textData =  async (req, res) => {
 
  try {


  
     const { folderId, text } = req.body;
    const textObj = new Text({ folderId: folderId, text:text });
    await textObj.save();
    res.status(201).json(textObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};















const postParentFolders = async (req, res) => {
  try {
    const [, token] = req.body.headers.Authorization.split(" ");
    const [, username] = token.split(":");
    const folderName = req.body.headers.name;
    const parentFolderId = req.body.headers.parentFolderId;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
      await Folder.create({
        userId: user._id,
        name: folderName,
        parentFolder: parentFolderId
      });
      res.json(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const postFiles = async (req, res) => {
  try {
    const [, token] = req.body.headers.Authorization.split(" ");
    const [, username] = token.split(":");
    const fileName = req.body.headers.name;
    const parentFolderId = req.body.headers.parentFolderId;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
    await File.create({
      name: fileName,
      parentFolder: parentFolderId,
    });
    res.json(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const postFilesData = async (req, res) => {
  try {
    const { parentFolderId, text } = req.body;
    const textObj = new Text({ fileId: parentFolderId, text: text });
    await textObj.save();
    res.status(201).json(textObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFolder =  (req,res) => {
  try {
    // Delete the folder and its subfolders recursively
    const { id } = req.params;
console.log(id)
    deleteSubitems(id);

     return res.status(200).json("deleted successfully");
  } catch (error) {
    console.error("Error deleting folder and subitems:", error);
  }
};

const deleteSubitems = async (folderId) => {
  try {
    // Delete the folder and its subfolders recursively
    console.log(folderId)
    await Folder.deleteOne({ _id: folderId });
    await File.deleteOne({ _id: folderId });

    await Folder.deleteMany({ parentFolder: folderId });
    await File.deleteMany({ parentFolder: folderId });

    // Find and delete subfolders recursively
    const subfolders = await Folder.find({ parentFolder: folderId });
    console.log(subfolders);
    for (const subfolder of subfolders) {
      await deleteSubitems(subfolder._id);
    }
    return "deleted successfully";
  } catch (error) {
    console.error("Error deleting folder and subitems:", error);
  }
};

module.exports = {
postParentFolders,
postFilesData,
postFiles,
deleteFolder
};