require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/database')
const {PORT} = process.env
const {User} = require('./models/user')
const {Post} = require('./models/post')
// const {getCurrentUserPosts} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
// const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

//AUTH
app.post('/register', register)
app.post('/login', login)




// the force: true is for development -- it DROPS tables!!!
sequelize.sync({ force: true })
// sequelize.sync()
    .then(() => {
        app.listen(4005, () => console.log(`db sync successful & server running on port 4005`))
    })
    .catch(err => console.log(err))