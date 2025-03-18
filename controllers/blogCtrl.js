const Blog = require("../models/blogModel");
const { errorHandl }  = require("../middleware/errorHandler");

const createBlog = async (req, res, next) => {
    try {
        req.body.createdBy = req.user;
        const blog = await Blog.create(req.body);
        res.json({
            error: false,
            status: 200,
            message: "Blog created successfully!"
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, createdBy: req.user}, req.body);
        if(!blog) throw new Error("Either you do not have permit to update this blog or blog doesn't exist!")
        res.json({
            error: false,
            status: 200,
            message: "Blog updated successfully!"
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndDelete({_id: req.params.id, createdBy: req.user}, req.body);
        if(!blog) throw new Error("Either you do not have permit to delete this blog or blog doesn't exist!")
        res.json({
            error: false,
            status: 200,
            message: "Blog Deleted successfully!"
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

const listBlog = async (req, res, next) => {
    try {
        const {page, count} = req.query;
        const [blog, totalCount] = await Promise.all([
            Blog.find({ createdBy: req.user }).skip(page * count).limit(count),
            Blog.countDocuments({ createdBy: req.user })
        ]);
        res.json({
            error: false,
            status: 200,
            message: "Blog created successfully!",
            data: blog,
            count: totalCount
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const {page, count} = req.query;
        const blog = await Blog.findById({ createdBy: req.user, _id: req.params.id });
        res.json({
            error: false,
            status: 200,
            message: "Blog created successfully!",
            data: blog
        })
    }
    catch(error) {
        errorHandl(res, error, 401);    
    }
}



module.exports = {
    listBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
}