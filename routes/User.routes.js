const router = require("express").Router();

const { inserts,viewAll,deletes,edit,updateData } = require("../controller/user.Controller");
const authentication = require("../middleware/checkAuth");


router.post("/addUserData", inserts);
router.get("/view", viewAll);
router.delete("/deleteData/:id",authentication, deletes);
router.get("/editData/:id", edit);
router.patch("/updateUser/:id",authentication, updateData);

module.exports = router;