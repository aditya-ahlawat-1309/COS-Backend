const express = require("express");
const { User, Folder ,File, Text} = require("../Database/schema");
const app = express();

app.use(express.json());


const getParentFolders = async (req, res) => {
  try {
    console.log(req.body.headers);
    const { Authorization } = req.body.headers;
    const [, token] = Authorization.split(" ");
    const [, username] = token.split(":");
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
    const folders = await Folder.find({ userId: user._id }).exec();
    res.json(folders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getSubfoldersAndFiles = async(req,res)  => {

   const { id } = req.body.headers;
  const subfolders = await Folder.find({ parentFolder: id });

  // Fetch all files under the parent folder
  const files = await File.find({ parentFolder: id });

  // // Iterate over subfolders to fetch their subfolders and files recursively
  // for (const subfolder of subfolders) {
  //   const subfolderId = subfolder._id;
  //   const subfolderContent = await getSubfoldersAndFiles(subfolderId);
  //   subfolder.subfolders = subfolderContent.subfolders;
  //   subfolder.files = subfolderContent.files;
  // }

  // Return the subfolders and files for the current folder
  res.status(200).json({subfolders,files});
}

// Function to fetch the text content of a file
const getFilesData = async (req, res) => {
  try {
    const { id } = req.body;
    const texts = await Text.find({ fileId: id });
    res.status(200).json(texts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};






module.exports = {
    getParentFolders,
    getFilesData,
    getSubfoldersAndFiles
}