const { getUser, updateUser, deleteUser, stats, createNewUser, blockUser, unblockUser } = require("../controller/admin");

const router = require("express").Router();

router.get("/user", getUser)
router.patch("/user", updateUser)
router.delete("/user", deleteUser)
router.get("/stats", stats)
router.post("/user", createNewUser)
router.post("/user/b", blockUser)
router.post("/user/u/b", unblockUser)

module.exports= router