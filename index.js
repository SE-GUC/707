const express = require('express')
const mongoose = require('mongoose')

// Require Router Handlers
const partners = require('./routes/api/partners')
const candidates= require('./routes/api/candidates')
const admins= require('./routes/api/admins')
const projects= require('./routes/api/projects')
const messages= require('./routes/api/messages')
const applications= require('./routes/api/applications')
const evaluations= require('./routes/api/evaluations')
const lifecycles= require('./routes/api/lifecycles')
const notifications= require('./routes/api/notifications')
const certificates= require('./routes/api/certificates')
const invitations= require('./routes/api/invitations')




const app = express()

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Entry point
app.get('/', (req,res) => res.send(`<h1>Welcome to LirtenHub</h1>`))
app.get('/test', (req,res) => res.send(`<h1>Deployed on Heroku</h1>`))

// Direct to Route Handlers
app.use('/api/partners',partners)
app.use('/api/candidates',candidates)
app.use('/api/admins',admins)
app.use('/api/projects',projects)
app.use('/api/messages',messages)
app.use('/api/applications',applications)
app.use('/api/evaluations',evaluations)
app.use('/api/lifecycles',lifecycles)
app.use('/api/notifications',notifications)
app.use('/api/certificates',certificates)
app.use('/api/invitations',invitations)





app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))