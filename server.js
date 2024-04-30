const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Blog = require('./models/blog.js')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


// ============= ROUTES =====================
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/blogs', (req, res) => {
    res.render('./blogs/index.ejs')
})

app.get('/blogs/new', (req,res) => {
    res.render('./blogs/new.ejs')
})

app.post('/blogs', async (req, res) => {
    let newBlog = (req.body)
    
    let reqKeys = Object.keys(newBlog)
    let hasImg = false

    reqKeys.forEach( (key) => {
        if (key === 'imgYes') {
            delete newBlog.imgYes
            hasImg = true
        } else if (key === 'imgNo') {
            delete newBlog.imgNo
        }
    })

    newBlog.hasImg = hasImg
    await Blog.create(newBlog)
    res.redirect('/')
})
// ============= ROUTES =====================


mongoose.connection.on('connected', () => {
    console.log('Connected to database...')
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})
