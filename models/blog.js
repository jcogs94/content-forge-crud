const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    userName: String,
    postTitle: String,
    category: String,
    message: String,
    hasImg: Boolean,
    imgLink: String
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
