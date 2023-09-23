const express = require("express");
const router = express.Router();
const postController = require("../../Controller/Post/Post");

router.post("/addpost", postController.postreq);
router.get("/getpost", postController.getpost);

module.exports = router;
