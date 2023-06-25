const router = require("express").Router();
const authenticate  = require("../middleware/checkAuth");
const { login, logout } = require("../controller/authentication.controller");

router.post("/login",login);
router.get("/logout",authenticate,logout);

module.exports = router;