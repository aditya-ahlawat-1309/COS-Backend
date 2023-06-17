const express = require("express");
const { Icon, CentralIcon, User } = require("../Database/schema");
const app = express();
app.use(express.json());

// API endpoint to fetch central icons
const getAdminDetails = async (req, res) => {

   const [, token] = req.body.headers.Authorization.split(" ");
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

  try {
    res.json(user);
  } catch (error) {
    console.error("Error fetching user Deatils:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCentralIcons = async (req, res) => {

  try {
    const centralIcons = await CentralIcon.find();
    res.json(centralIcons);
  } catch (error) {
    console.error("Error fetching central icons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCentralIcons = async (req, res) => {
  try {
    const icon = req.body.headers;
   await CentralIcon.create({
      iconname: icon.iconname,
      link: icon.link,
      image: icon.image,
    });
  } catch (error) {
    console.error("Error creating central icons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCentralIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { iconname, link, image } = req.body;

    // Find the central icon by ID and update its fields
    await CentralIcon.findByIdAndUpdate(id, { iconname, link, image });

    res.status(200).json({ message: "Central icon updated successfully" });
  } catch (error) {
    console.error("Error updating central icon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCentralIcon = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the central icon by ID and delete it
    await CentralIcon.findByIdAndRemove(id);

    res.status(200).json({ message: "Central icon deleted successfully" });
  } catch (error) {
    console.error("Error deleting central icon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAddedIcon = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the central icon by ID and delete it
    await Icon.findByIdAndRemove(id);

    res.status(200).json({ message: "Central icon deleted successfully" });
  } catch (error) {
    console.error("Error deleting central icon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getIcons = async (req, res) => {
     const [, token] = req.body.headers.Authorization.split(" ");
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

  try {
    const icons = await Icon.find({ userId: user._id }).exec();
    console.log(icons);
    res.json(icons);
  } catch (error) {
    console.error("Error fetching icons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API endpoint to add an icon to the database
const createIcons = async (req, res) => {
     const [, token] = req.body.headers.Authorization.split(" ");
     const [password, username] = token.split(":");
     const user = await User.findOne({ username }).exec();
     if (!user) {
       res.status(403);
       res.json({
         message: "Invalid access",
       });
       return;
     }
  try {
    const { selectedIcons } = req.body.headers;
    const centralIcons = await CentralIcon.find({
      _id: { $in: selectedIcons },
    });
    const iconsToAdd = centralIcons.map((icon) => ({
      name: icon.iconname,
      link: icon.link,
      image: icon.image,
      userId: user._id, // Assuming you have user authentication implemented
    }));
    await Icon.insertMany(iconsToAdd);
    res.json({ message: "Icons added successfully" });
  } catch (error) {
    console.error("Error adding icons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCentralIcons,
  createIcons,
  getIcons,
  getAdminDetails,
  createCentralIcons,
  updateCentralIcon,
  deleteCentralIcon,
  deleteAddedIcon
};
