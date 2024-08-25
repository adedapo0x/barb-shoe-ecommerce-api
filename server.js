const http = require("http")
require("dotenv").config()

const app = require("./src/app")
const connectDB = require('./src/config/connectDB')
const PORT = 8000 || process.env.PORT

const startServer = async (req, res) => {
    const server = http.createServer(app)
    await connectDB()

    server.listen(PORT, ()=> console.log("Server listening for request!"))
}

startServer()



