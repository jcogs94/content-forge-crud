// Partnered with Matthew B

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const methodOverride = require('method-override')

const Blog = require('./models/blog.js')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))


// ============= ROUTES =====================
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find()

    // Loops through all blogs and sorts them by category
    // Stores each blog in categories obj, the keys being
    // the category of blog
    let categories = {}
    allBlogs.forEach( (blog) => {
        // Defines a new array for the category if not already defined
        if (categories[blog.category] === undefined) {
            categories[blog.category] = []
        }

        // Pushes the blog to the category it belongs to
        categories[blog.category].push(blog)
    })

    // Sends the obj of sorted blogs to the ejs along
    // with an array of keys to be iterated over
    res.render('./blogs/index.ejs', {
        allBlogsByCategory: categories,
        categories: Object.keys(categories)
    })
})

app.get('/blogs/new', (req,res) => {
    res.render('./blogs/new.ejs')
})

app.post('/blogs', async (req, res) => {
    let newBlog = (req.body)

    if(newBlog.hasImg === 'yes') {
        newBlog.hasImg = true

    } else {
        newBlog.hasImg = false
        newBlog.imgLink = ''
    }
    
    await Blog.create(newBlog)
    res.redirect('/blogs')
})

app.get('/blogs/:id', async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id)
    res.render('./blogs/show.ejs', {
        blog: foundBlog
    })
})

app.get('/blogs/:id/edit', async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id)
    res.render('./blogs/edit.ejs', {
        blog: foundBlog
    })
})

app.put('/blogs/:id', async (req, res) => {
    let updatedBlog = (req.body)
    
    if(updatedBlog.hasImg === 'yes') {
        updatedBlog.hasImg = true
    } else {
        updatedBlog.hasImg = false
        updatedBlog.imgLink = ''
    }
    
    await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
    res.redirect('/blogs')
})

app.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
})
// ============= ROUTES =====================


mongoose.connection.on('connected', () => {
    console.log('Connected to database...')
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})
