const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    timePosted: String,
    category: String,
    message: String,
    hasImg: Boolean,
    imgLinks: Array,
    tags: Array
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
