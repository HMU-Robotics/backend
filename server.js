require('dotenv').config()
const http = require("http")
const app = require('./api/app')


const port = process.env.PORT || 3000

const server = http.createServer(app)
console.log(`Server running on port ${port}`)
server.listen(port)