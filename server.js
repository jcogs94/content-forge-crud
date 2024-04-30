const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Blog = require('./models/blog.js')

app.use(express.static('public'))


// ============= ROUTES =====================
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/blogs/new', (req,res) => {
    res.render('./blogs/new.ejs')
})
// ============= ROUTES =====================


mongoose.connection.on('connected', () => {
    console.log('Connected to database...')
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})
