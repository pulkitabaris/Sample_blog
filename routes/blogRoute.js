const router = require("express").Router();
const {    listBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} = require("../controllers/blogCtrl");

const { authMiddleware } = require("../middleware/authMiddleware")

router.get("/", authMiddleware, listBlog);
router.post("/create", authMiddleware, createBlog);
router.put("/update/:id", authMiddleware, updateBlog);
router.delete("/delete/:id", authMiddleware, deleteBlog);
router.get("/:id", authMiddleware, getBlogById);


module.exports = router;