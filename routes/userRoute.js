const router = require("express").Router();
const {    signUp, login
} = require("../controllers/userCtrl");

const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
