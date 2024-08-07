const http = require("http")
require("dotenv").config()

const app = require("./src/app")
const connectDB = require('./src/config/connectDB')
const PORT = 8000 || process.env.PORT
const server = http.createServer(app)

connectDB()

server.listen(PORT, ()=> console.log("Server running fine!"))