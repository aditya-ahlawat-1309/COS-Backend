const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { LoginUser } = require("../Authentication/Login");
const { registerUser } = require("../Authentication/Register");
const {
  getParentFolders,
  getFilesData,
  getSubfoldersAndFiles,
} = require("../model/get");
const { postParentFolders, postFilesData, postFiles, deleteFolder } = require("../model/post");
const {commandData} = require("../model/commands")

const {getCentralIcons, createIcons, getIcons, getAdminDetails, createCentralIcons, deleteCentralIcon, deleteAddedIcon} = require("../model/icons")

const router = express.Router();

router.route("/isAdmin").post(getAdminDetails);


router.route("/get/parentFolders").post(getParentFolders);
router.route("/get/files/text").post(getFilesData);
router.route("/get/subFolders").post(getSubfoldersAndFiles);


router.route("/post/folders").post(postParentFolders);
router.route("/post/files").post(postFiles);
router.route("/post/texts").post(postFilesData);
router.route("/post/delete/:id").post(deleteFolder);


router.route("/register").post(registerUser);
router.route("/login").post( LoginUser);


router.route("/command").post( commandData);

router.route('/icons').post( createIcons);
router.route("/getIcons").post( getIcons);

router.route("/central-icons").get(getCentralIcons);
router.route("/create").post(createCentralIcons)
router.route("/update/:id").post(createCentralIcons);
router.route("/delete/:id").post(deleteCentralIcon);
router.route("/delete/icon/:id").post(deleteAddedIcon);

module.exports = {routerFolder: router};